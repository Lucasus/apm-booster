import React from 'react';
import { formatDuration } from '../../utils/calculations';

interface TrainerStatsProps {
  score: number;
  misses?: number;
  accuracy: number;
  timeRemaining: number;
  cpm?: number;
  isPaused?: boolean;
}

export const TrainerStats: React.FC<TrainerStatsProps> = ({
  score,
  misses,
  accuracy,
  timeRemaining,
  cpm,
  isPaused = false
}) => {
  return (
    <div className="bg-sc2-gray-800 rounded-lg p-6 mb-6 border border-sc2-gray-700">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-sc2-gray-500 text-sm font-mono mb-1">SCORE</div>
          <div className="text-3xl font-bold font-mono text-sc2-teal stat-update">
            {score}
          </div>
        </div>

        {misses !== undefined && (
          <div className="text-center">
            <div className="text-sc2-gray-500 text-sm font-mono mb-1">MISSES</div>
            <div className="text-3xl font-bold font-mono text-sc2-red stat-update">
              {misses}
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="text-sc2-gray-500 text-sm font-mono mb-1">ACCURACY</div>
          <div className="text-3xl font-bold font-mono text-sc2-gold stat-update">
            {accuracy}%
          </div>
        </div>

        {cpm !== undefined && (
          <div className="text-center">
            <div className="text-sc2-gray-500 text-sm font-mono mb-1">CPM</div>
            <div className="text-3xl font-bold font-mono text-sc2-brightBlue stat-update">
              {cpm}
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="text-sc2-gray-500 text-sm font-mono mb-1">TIME</div>
          <div className={`text-3xl font-bold font-mono ${isPaused ? 'text-sc2-gold animate-pulse' : 'text-white'} stat-update`}>
            {formatDuration(timeRemaining)}
          </div>
        </div>
      </div>

      {isPaused && (
        <div className="mt-4 text-center">
          <div className="inline-block bg-sc2-gold text-sc2-darker px-4 py-2 rounded font-bold animate-pulse">
            PAUSED
          </div>
        </div>
      )}
    </div>
  );
};
