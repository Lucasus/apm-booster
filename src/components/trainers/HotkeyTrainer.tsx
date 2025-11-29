import { useState } from 'react';
import { useHotkeyTrainer } from '../../hooks/useHotkeyTrainer';
import { useStats } from '../../hooks/useStats';
import { TrainerStats } from './TrainerStats';
import { DEFAULT_SESSION_DURATION } from '../../utils/constants';

export const HotkeyTrainer = () => {
  const [duration, setDuration] = useState(DEFAULT_SESSION_DURATION);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const { saveHotkeySession } = useStats();

  const {
    isActive,
    isPaused,
    currentSequence,
    currentInput,
    score,
    fails,
    timeRemaining,
    accuracy,
    startTraining,
    pauseTraining,
    resumeTraining,
    stopTraining
  } = useHotkeyTrainer({
    duration,
    difficulty,
    onSessionComplete: saveHotkeySession
  });

  const handleStart = () => {
    startTraining();
  };

  const handleStop = () => {
    stopTraining();
  };

  return (
    <div className="min-h-screen bg-sc2-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sc2-brightBlue mb-8 text-center">
          Hotkey Sequence Trainer
        </h1>

        {!isActive ? (
          <div className="bg-sc2-darkBlue border-2 border-sc2-blue rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-sc2-teal mb-6">Training Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sc2-teal mb-2">
                  Duration (seconds): {duration}s
                </label>
                <input
                  type="range"
                  min="15"
                  max="300"
                  step="15"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-sc2-dark rounded-lg appearance-none cursor-pointer accent-sc2-brightBlue"
                />
              </div>

              <div>
                <label className="block text-sc2-teal mb-2">Difficulty</label>
                <div className="flex gap-4">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-6 py-3 rounded font-semibold transition-all ${
                        difficulty === level
                          ? 'bg-sc2-brightBlue text-sc2-dark'
                          : 'bg-sc2-dark text-sc2-blue border border-sc2-blue hover:bg-sc2-blue hover:text-white'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full mt-8 bg-sc2-teal text-sc2-dark py-4 rounded-lg font-bold text-xl hover:bg-sc2-brightBlue transition-colors"
            >
              Start Training
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-sc2-darkBlue border-2 border-sc2-blue rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-3xl font-bold text-sc2-gold">
                  Time: {timeRemaining}s
                </div>
                <div className="flex gap-4">
                  {!isPaused ? (
                    <button
                      onClick={pauseTraining}
                      className="px-6 py-2 bg-sc2-gold text-sc2-dark rounded font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={resumeTraining}
                      className="px-6 py-2 bg-sc2-teal text-sc2-dark rounded font-semibold hover:bg-sc2-brightBlue transition-colors"
                    >
                      Resume
                    </button>
                  )}
                  <button
                    onClick={handleStop}
                    className="px-6 py-2 bg-sc2-red text-white rounded font-semibold hover:bg-red-600 transition-colors"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <TrainerStats
                score={score}
                misses={fails}
                accuracy={accuracy}
                timeRemaining={timeRemaining}
                isPaused={isPaused}
              />
            </div>

            {isPaused ? (
              <div className="bg-sc2-darkBlue border-2 border-sc2-gold rounded-lg p-12 text-center">
                <h2 className="text-3xl font-bold text-sc2-gold mb-4">Training Paused</h2>
                <p className="text-sc2-lightGray">Click Resume to continue</p>
              </div>
            ) : currentSequence ? (
              <div className="bg-sc2-darkBlue border-2 border-sc2-teal rounded-lg p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-sc2-teal mb-2">
                    {currentSequence.description}
                  </h2>
                  <p className="text-sc2-lightGray text-sm">
                    {currentSequence.category.charAt(0).toUpperCase() + currentSequence.category.slice(1)}
                  </p>
                </div>

                <div className="flex justify-center items-center gap-4 mb-8">
                  {currentSequence.keys.map((key, index) => {
                    const isCompleted = index < currentInput.length;
                    const isCurrent = index === currentInput.length;

                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`px-8 py-6 rounded-lg font-bold text-2xl border-2 transition-all ${
                            isCompleted
                              ? 'bg-sc2-teal text-sc2-dark border-sc2-teal scale-110'
                              : isCurrent
                              ? 'bg-sc2-darkBlue text-sc2-brightBlue border-sc2-brightBlue scale-110 animate-pulse'
                              : 'bg-sc2-dark text-sc2-lightGray border-sc2-gray'
                          }`}
                        >
                          {key}
                        </div>
                        {index < currentSequence.keys.length - 1 && (
                          <span className="text-sc2-lightGray text-2xl">+</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <div className="inline-flex gap-2">
                    {currentSequence.keys.map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all ${
                          index < currentInput.length
                            ? 'bg-sc2-teal scale-110'
                            : 'bg-sc2-gray'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
