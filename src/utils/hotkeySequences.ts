import { HotkeySequence } from '../types';

export const SC2_SEQUENCES: HotkeySequence[] = [
  {
    id: 'cg1',
    keys: ['Control', '1'],
    description: 'Set Control Group 1',
    difficulty: 'easy',
    category: 'control'
  },
  {
    id: 'cg1-select',
    keys: ['1'],
    description: 'Select Control Group 1',
    difficulty: 'easy',
    category: 'control'
  },
  {
    id: 'cg2',
    keys: ['Control', '2'],
    description: 'Set Control Group 2',
    difficulty: 'easy',
    category: 'control'
  },
  {
    id: 'camera1',
    keys: ['F1'],
    description: 'Jump to Camera Location 1',
    difficulty: 'easy',
    category: 'camera'
  },
  {
    id: 'marine-cycle',
    keys: ['4', 'S', 'A'],
    description: 'Barracks - Marine',
    difficulty: 'medium',
    category: 'production'
  },
  {
    id: 'scv-cycle',
    keys: ['5', 'S'],
    description: 'Command Center - SCV',
    difficulty: 'medium',
    category: 'production'
  },
  {
    id: 'attack-move',
    keys: ['A'],
    description: 'Attack Move Command',
    difficulty: 'medium',
    category: 'army'
  },
  {
    id: 'camera2',
    keys: ['F2'],
    description: 'Jump to Camera Location 2',
    difficulty: 'medium',
    category: 'camera'
  },
  {
    id: 'army-split',
    keys: ['Control', 'Shift', '1'],
    description: 'Add to Control Group 1',
    difficulty: 'hard',
    category: 'army'
  },
  {
    id: 'production-chain',
    keys: ['4', 'S', 'D', '5', 'T', 'A'],
    description: 'Barracks Marauder - Factory Tank',
    difficulty: 'hard',
    category: 'production'
  },
  {
    id: 'camera-set',
    keys: ['Control', 'F1'],
    description: 'Set Camera Location 1',
    difficulty: 'hard',
    category: 'camera'
  },
  {
    id: 'cycle-army',
    keys: ['1', 'A', '2', 'A', '3', 'A'],
    description: 'Attack Move All Army Groups',
    difficulty: 'hard',
    category: 'army'
  }
];

export const getRandomSequence = (difficulty: 'easy' | 'medium' | 'hard'): HotkeySequence => {
  const filtered = SC2_SEQUENCES.filter(s => s.difficulty === difficulty);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const normalizeKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    'Control': 'Control',
    'Shift': 'Shift',
    'Alt': 'Alt',
    ' ': 'Space'
  };
  return keyMap[key] || key.toUpperCase();
};
