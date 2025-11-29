export const DIFFICULTY_CONFIG = {
  easy: {
    targetSize: 60,
    targetLifetime: 2000,
    spawnDelay: 300
  },
  medium: {
    targetSize: 45,
    targetLifetime: 1500,
    spawnDelay: 200
  },
  hard: {
    targetSize: 30,
    targetLifetime: 1000,
    spawnDelay: 150
  }
} as const;

export const DEFAULT_SESSION_DURATION = 60;

export const TRAINING_AREA_SIZE = {
  width: 800,
  height: 600
} as const;

export const MAX_RECENT_SESSIONS = 20;

export const STORAGE_KEYS = {
  STATS: 'apm-booster:stats',
  SETTINGS: 'apm-booster:settings',
  LAST_SESSION: 'apm-booster:last-session'
} as const;
