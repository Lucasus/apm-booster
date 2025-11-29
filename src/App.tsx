import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ClickTrainer } from './components/trainers/ClickTrainer';
import { TrainerMode } from './types';
import { useStats } from './hooks/useStats';

function App() {
  const [currentMode, setCurrentMode] = useState<TrainerMode>('click');
  const { saveClickSession } = useStats();

  return (
    <Layout currentMode={currentMode} onModeChange={setCurrentMode}>
      {currentMode === 'click' && (
        <ClickTrainer onSessionComplete={saveClickSession} />
      )}

      {currentMode === 'hotkey' && (
        <div className="text-center py-20">
          <h2 className="text-4xl font-sc2 text-sc2-brightBlue mb-4">
            Hotkey Trainer
          </h2>
          <p className="text-sc2-gray-500 text-lg">
            Coming soon...
          </p>
        </div>
      )}

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
