import { useState, useEffect, useCallback, useRef } from 'react';
import { HotkeySequence, HotkeySession } from '../types';
import { getRandomSequence, normalizeKey } from '../utils/hotkeySequences';

interface UseHotkeyTrainerProps {
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  onSessionComplete: (session: HotkeySession) => void;
}

export const useHotkeyTrainer = ({ duration, difficulty, onSessionComplete }: UseHotkeyTrainerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<HotkeySequence | null>(null);
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [fails, setFails] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const sessionStartTime = useRef<number>(0);
  const sequenceStartTime = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const nextSequence = useCallback(() => {
    const sequence = getRandomSequence(difficulty);
    setCurrentSequence(sequence);
    setCurrentInput([]);
    sequenceStartTime.current = Date.now();
  }, [difficulty]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isActive || isPaused || !currentSequence) return;

    event.preventDefault();

    const key = normalizeKey(event.key);
    const newInput = [...currentInput, key];

    const expectedKey = currentSequence.keys[currentInput.length];
    const isCorrect = expectedKey === key;

    if (!isCorrect) {
      setFails(prev => prev + 1);
      nextSequence();
      return;
    }

    setCurrentInput(newInput);

    if (newInput.length === currentSequence.keys.length) {
      const reactionTime = Date.now() - sequenceStartTime.current;
      setReactionTimes(prev => [...prev, reactionTime]);
      setScore(prev => prev + 1);
      setTimeout(() => nextSequence(), 200);
    }
  }, [isActive, isPaused, currentSequence, currentInput, nextSequence]);

  const startTraining = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
    setScore(0);
    setFails(0);
    setTimeRemaining(duration);
    setReactionTimes([]);
    sessionStartTime.current = Date.now();
    setTimeout(() => nextSequence(), 0);
  }, [duration, nextSequence]);

  const pauseTraining = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTraining = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stopTraining = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setCurrentSequence(null);
    setCurrentInput([]);

    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!isActive || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, isPaused, handleKeyPress]);

  useEffect(() => {
    const handleBlur = () => {
      if (isActive && !isPaused) {
        pauseTraining();
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [isActive, isPaused, pauseTraining]);

  const wasActive = useRef(false);

  useEffect(() => {
    if (wasActive.current && !isActive) {
      const actualDuration = duration - timeRemaining;
      const totalSequences = score + fails;

      if (totalSequences > 0 || actualDuration > 0) {
        const avgReactionTime = reactionTimes.length > 0
          ? Math.round(reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length)
          : 0;

        const session: HotkeySession = {
          id: crypto.randomUUID(),
          timestamp: sessionStartTime.current,
          duration: actualDuration,
          sequencesCompleted: score,
          sequencesFailed: fails,
          accuracy: totalSequences > 0 ? Math.round((score / totalSequences) * 100) : 0,
          averageReactionTime: avgReactionTime,
          difficulty,
          totalKeystrokes: score * 2
        };

        onSessionComplete(session);
      }
    }
    wasActive.current = isActive;
  }, [isActive, score, fails, timeRemaining, duration, difficulty, reactionTimes, onSessionComplete]);

  return {
    isActive,
    isPaused,
    currentSequence,
    currentInput,
    score,
    fails,
    timeRemaining,
    accuracy: score + fails > 0 ? Math.round((score / (score + fails)) * 100) : 0,
    startTraining,
    pauseTraining,
    resumeTraining,
    stopTraining
  };
};
