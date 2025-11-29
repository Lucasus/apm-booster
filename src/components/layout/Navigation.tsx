import React from 'react';
import { TrainerMode } from '../../types';
import clsx from 'clsx';

interface NavigationProps {
  currentMode: TrainerMode;
  onModeChange: (mode: TrainerMode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentMode, onModeChange }) => {
  const modes: { id: TrainerMode; label: string }[] = [
    { id: 'click', label: 'Click Trainer' },
    { id: 'hotkey', label: 'Hotkey Trainer' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <nav className="bg-sc2-gray-800 border-b border-sc2-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex space-x-1">
          {modes.map(mode => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={clsx(
                'px-6 py-3 font-semibold transition-all duration-200',
                currentMode === mode.id
                  ? 'bg-sc2-blue text-white shadow-sc2-glow'
                  : 'bg-transparent text-sc2-gray-500 hover:text-white hover:bg-sc2-gray-700'
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
