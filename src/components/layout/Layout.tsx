import React from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { TrainerMode } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentMode: TrainerMode;
  onModeChange: (mode: TrainerMode) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentMode, onModeChange }) => {
  return (
    <div className="min-h-screen bg-sc2-dark">
      <Header />
      <Navigation currentMode={currentMode} onModeChange={onModeChange} />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};
