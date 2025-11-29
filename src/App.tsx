import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ClickTrainer } from './components/trainers/ClickTrainer';
import { HotkeyTrainer } from './components/trainers/HotkeyTrainer';
import { TrainerMode } from './types';

function App() {
  const [currentMode, setCurrentMode] = useState<TrainerMode>('click');

  return (
    <Layout currentMode={currentMode} onModeChange={setCurrentMode}>
      {currentMode === 'click' && <ClickTrainer />}

      {currentMode === 'hotkey' && <HotkeyTrainer />}

      {currentMode === 'dashboard' && (
        <div className="text-center py-20">
          <h2 className="text-4xl font-sc2 text-sc2-brightBlue mb-4">
            Dashboard
          </h2>
          <p className="text-sc2-gray-500 text-lg">
            Coming soon...
          </p>
        </div>
      )}
    </Layout>
  );
}

export default App;
