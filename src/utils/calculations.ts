import { ClickSession, HotkeySession } from '../types';

export const calculateAccuracy = (hits: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((hits / total) * 100);
};

export const calculateCPM = (clicks: number, seconds: number): number => {
  if (seconds === 0) return 0;
  return Math.round((clicks / seconds) * 60);
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatPlayTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export const calculateAverages = (sessions: (ClickSession | HotkeySession)[]) => {
  const clickSessions = sessions.filter((s): s is ClickSession => 'cpm' in s);

  if (clickSessions.length === 0) {
    return { avgCPM: 0, avgAccuracy: 0 };
  }

  const avgCPM = Math.round(
    clickSessions.reduce((sum, s) => sum + s.cpm, 0) / clickSessions.length
  );

  const avgAccuracy = Math.round(
    sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
  );

  return { avgCPM, avgAccuracy };
};

export const getLast14Days = (): string[] => {
  const days: string[] = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
