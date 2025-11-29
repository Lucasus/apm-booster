import { useState, useEffect, useCallback, useRef } from 'react';
import { Target, ClickSession } from '../types';
import { DIFFICULTY_CONFIG, TRAINING_AREA_SIZE } from '../utils/constants';

interface UseClickTrainerProps {
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  onSessionComplete: (session: ClickSession) => void;
}

export const useClickTrainer = ({ duration, difficulty, onSessionComplete }: UseClickTrainerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<Target | null>(null);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [cpm, setCPM] = useState(0);

  const sessionStartTime = useRef<number>(0);
  const pausedTime = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const cpmTimerRef = useRef<number | null>(null);
  const targetTimeoutRef = useRef<number | null>(null);

  const config = DIFFICULTY_CONFIG[difficulty];

  const spawnTarget = useCallback(() => {
    if (!isActive || isPaused) return;

    const margin = config.targetSize / 2 + 10;

    const target: Target = {
      id: crypto.randomUUID(),
      x: margin + Math.random() * (TRAINING_AREA_SIZE.width - 2 * margin),
      y: margin + Math.random() * (TRAINING_AREA_SIZE.height - 2 * margin),
      spawnTime: Date.now(),
      size: config.targetSize
    };

    setCurrentTarget(target);

    targetTimeoutRef.current = setTimeout(() => {
      setCurrentTarget(current => {
        if (current?.id === target.id) {
          setMisses(prev => prev + 1);
          spawnTarget();
          return null;
        }
        return current;
      });
    }, config.targetLifetime);
  }, [config, isActive, isPaused]);

  const handleTargetClick = useCallback((targetId: string) => {
    if (!isActive || isPaused) return;

    setCurrentTarget(current => {
      if (current?.id === targetId) {
        setScore(prev => prev + 1);
        if (targetTimeoutRef.current) clearTimeout(targetTimeoutRef.current);

        setTimeout(() => {
          spawnTarget();
        }, config.spawnDelay);

        return null;
      }
      return current;
    });
  }, [isActive, isPaused, spawnTarget, config.spawnDelay]);

  const handleMissClick = useCallback(() => {
    if (!isActive || isPaused) return;
  }, [isActive, isPaused]);

  const startTraining = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    setScore(0);
    setMisses(0);
    setTimeRemaining(duration);
    setCPM(0);
    sessionStartTime.current = Date.now();
    pausedTime.current = 0;
  }, [duration]);

  const pauseTraining = useCallback(() => {
    setIsPaused(true);
    setCurrentTarget(null);
    if (targetTimeoutRef.current) clearTimeout(targetTimeoutRef.current);
  }, []);

  const resumeTraining = useCallback(() => {
    setIsPaused(false);
    spawnTarget();
  }, [spawnTarget]);

  const stopTraining = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentTarget(null);

    if (timerRef.current) clearInterval(timerRef.current);
    if (cpmTimerRef.current) clearInterval(cpmTimerRef.current);
    if (targetTimeoutRef.current) clearTimeout(targetTimeoutRef.current);

    const actualDuration = duration - timeRemaining;
    const totalClicks = score + misses;

    const session: ClickSession = {
      id: crypto.randomUUID(),
      timestamp: sessionStartTime.current,
      duration: actualDuration,
      totalClicks,
      successfulClicks: score,
      missedClicks: misses,
      accuracy: totalClicks > 0 ? Math.round((score / totalClicks) * 100) : 0,
      cpm,
      targetsSeen: totalClicks
    };

    onSessionComplete(session);
  }, [score, misses, timeRemaining, duration, cpm, onSessionComplete]);

  useEffect(() => {
    if (isActive && !isPaused) {
      spawnTarget();
    }
  }, [isActive, isPaused, spawnTarget]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          stopTraining();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused, stopTraining]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    cpmTimerRef.current = setInterval(() => {
      const elapsed = (Date.now() - sessionStartTime.current - pausedTime.current) / 1000;
      if (elapsed > 0) {
        const currentCPM = Math.round((score / elapsed) * 60);
        setCPM(currentCPM);
      }
    }, 100);

    return () => {
      if (cpmTimerRef.current) clearInterval(cpmTimerRef.current);
    };
  }, [isActive, isPaused, score]);

  useEffect(() => {
    const handleBlur = () => {
      if (isActive && !isPaused) {
        pauseTraining();
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isActive, isPaused, pauseTraining]);

  return {
    isActive,
    isPaused,
    currentTarget,
    score,
    misses,
    timeRemaining,
    cpm,
    accuracy: score + misses > 0 ? Math.round((score / (score + misses)) * 100) : 0,
    startTraining,
    pauseTraining,
    resumeTraining,
    stopTraining,
    handleTargetClick,
    handleMissClick
  };
};
