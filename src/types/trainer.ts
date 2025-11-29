export interface Target {
  id: string;
  x: number;
  y: number;
  spawnTime: number;
  size: number;
}

export interface HotkeySequence {
  id: string;
  keys: string[];
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'army' | 'control' | 'camera' | 'production';
}

export interface TrainerConfig {
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ClickTrainerState {
  isActive: boolean;
  currentTarget: Target | null;
  score: number;
  misses: number;
  timeRemaining: number;
  config: TrainerConfig;
}

export interface HotkeyTrainerState {
  isActive: boolean;
  currentSequence: HotkeySequence | null;
  currentInput: string[];
  score: number;
  fails: number;
  timeRemaining: number;
  config: TrainerConfig;
}
