import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-sc2-gray-800 border-b-2 border-sc2-blue shadow-sc2-glow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-sc2 font-black text-sc2-brightBlue">
            APM BOOSTER
          </h1>
          <div className="text-sm text-sc2-gray-500 font-mono">
            StarCraft 2 Training
          </div>
        </div>
      </div>
    </header>
  );
};
