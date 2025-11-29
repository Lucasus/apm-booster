import React, { useState } from 'react';
import { useClickTrainer } from '../../hooks/useClickTrainer';
import { TrainerStats } from './TrainerStats';
import { Button } from '../ui/Button';
import { DEFAULT_SESSION_DURATION, TRAINING_AREA_SIZE } from '../../utils/constants';
import clsx from 'clsx';

interface ClickTrainerProps {
  onSessionComplete: (session: any) => void;
}

export const ClickTrainer: React.FC<ClickTrainerProps> = ({ onSessionComplete }) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [duration, setDuration] = useState(DEFAULT_SESSION_DURATION);

  const {
    isActive,
    isPaused,
    currentTarget,
    score,
    misses,
    timeRemaining,
    cpm,
    accuracy,
    startTraining,
    pauseTraining,
    resumeTraining,
    stopTraining,
    handleTargetClick,
    handleMissClick
  } = useClickTrainer({
    duration,
    difficulty,
    onSessionComplete
  });

  const difficultyOptions: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-sc2 text-sc2-brightBlue mb-6">Click Speed Trainer</h2>

      {!isActive && (
        <div className="bg-sc2-gray-800 rounded-lg p-6 mb-6 border border-sc2-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sc2-gray-500 text-sm font-mono mb-2">
                DIFFICULTY
              </label>
              <div className="flex gap-2">
                {difficultyOptions.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={clsx(
                      'flex-1 py-2 px-4 rounded font-semibold transition-all',
                      difficulty === diff
                        ? 'bg-sc2-blue text-white shadow-sc2-glow'
                        : 'bg-sc2-gray-700 text-sc2-gray-500 hover:text-white'
                    )}
                  >
                    {diff.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sc2-gray-500 text-sm font-mono mb-2">
                DURATION (SECONDS)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(10, Math.min(300, Number(e.target.value))))}
                className="w-full bg-sc2-gray-700 text-white px-4 py-2 rounded font-mono"
                min="10"
                max="300"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button size="lg" onClick={startTraining} className="w-full">
              START TRAINING
            </Button>
          </div>
        </div>
      )}

      {isActive && (
        <>
          <TrainerStats
            score={score}
            misses={misses}
            accuracy={accuracy}
            timeRemaining={timeRemaining}
            cpm={cpm}
            isPaused={isPaused}
          />

          <div
            className="relative bg-sc2-gray-900 rounded-lg border-2 border-sc2-blue shadow-sc2-glow target-cursor"
            style={{
              width: `${TRAINING_AREA_SIZE.width}px`,
              height: `${TRAINING_AREA_SIZE.height}px`,
              margin: '0 auto'
            }}
            onClick={handleMissClick}
          >
            {isPaused && (
              <div className="absolute inset-0 bg-sc2-darker bg-opacity-90 flex flex-col items-center justify-center z-20">
                <h3 className="text-4xl font-sc2 text-sc2-gold mb-4">PAUSED</h3>
                <p className="text-sc2-gray-500 mb-6">Training paused due to window blur</p>
                <Button size="lg" onClick={resumeTraining}>
                  RESUME
                </Button>
              </div>
            )}

            {currentTarget && !isPaused && (
              <div
                className={clsx(
                  'absolute rounded-full cursor-crosshair',
                  'bg-gradient-to-br from-sc2-gold to-yellow-600',
                  'border-4 border-sc2-brightBlue',
                  'shadow-sc2-target',
                  'animate-target-spawn',
                  'hover:scale-110 transition-transform duration-100'
                )}
                style={{
                  left: `${currentTarget.x - currentTarget.size / 2}px`,
                  top: `${currentTarget.y - currentTarget.size / 2}px`,
                  width: `${currentTarget.size}px`,
                  height: `${currentTarget.size}px`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTargetClick(currentTarget.id);
                }}
              />
            )}
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            {!isPaused && (
              <Button variant="secondary" onClick={pauseTraining}>
                PAUSE
              </Button>
            )}
            <Button variant="danger" onClick={stopTraining}>
              STOP TRAINING
            </Button>
          </div>
        </>
      )}

      {!isActive && (
        <div className="mt-8 bg-sc2-gray-800 rounded-lg p-6 border border-sc2-gray-700">
          <h3 className="text-xl font-sc2 text-sc2-teal mb-4">How to Train</h3>
          <ul className="space-y-2 text-sc2-gray-500">
            <li className="flex items-start">
              <span className="text-sc2-brightBlue mr-2">•</span>
              Click the targets as quickly and accurately as possible
            </li>
            <li className="flex items-start">
              <span className="text-sc2-brightBlue mr-2">•</span>
              Targets disappear if not clicked in time (counts as a miss)
            </li>
            <li className="flex items-start">
              <span className="text-sc2-brightBlue mr-2">•</span>
              CPM (Clicks Per Minute) measures your speed
            </li>
            <li className="flex items-start">
              <span className="text-sc2-brightBlue mr-2">•</span>
              Training auto-pauses if you switch windows/tabs
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
