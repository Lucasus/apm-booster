import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { TrainerMode } from './types';

function App() {
  const [currentMode, setCurrentMode] = useState<TrainerMode>('click');

  return (
    <Layout currentMode={currentMode} onModeChange={setCurrentMode}>
      <div className="text-center py-20">
        <h2 className="text-4xl font-sc2 text-sc2-brightBlue mb-4">
          Welcome to APM Booster
        </h2>
        <p className="text-sc2-gray-500 text-lg">
          Select a training mode from the navigation above
        </p>
        <p className="text-sc2-gray-600 mt-4">
          Current mode: <span className="text-sc2-teal font-bold">{currentMode}</span>
        </p>
      </div>
    </Layout>
  );
}

export default App;
