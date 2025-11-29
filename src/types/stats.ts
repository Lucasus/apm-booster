export interface ClickSession {
  id: string;
  timestamp: number;
  duration: number;
  totalClicks: number;
  successfulClicks: number;
  missedClicks: number;
  accuracy: number;
  cpm: number;
  targetsSeen: number;
}

export interface HotkeySession {
  id: string;
  timestamp: number;
  duration: number;
  sequencesCompleted: number;
  sequencesFailed: number;
  accuracy: number;
  averageReactionTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  totalKeystrokes: number;
}

export interface DailyStats {
  date: string;
  clickSessions: ClickSession[];
  hotkeySessions: HotkeySession[];
  totalPlayTime: number;
  bestCPM: number;
  bestAccuracy: number;
}

export interface UserStats {
  totalSessions: number;
  totalPlayTime: number;
  bestCPM: number;
  bestAccuracy: number;
  averageCPM: number;
  averageAccuracy: number;
  dailyStats: Record<string, DailyStats>;
  recentSessions: (ClickSession | HotkeySession)[];
}
