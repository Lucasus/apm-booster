import { useLocalStorage } from './useLocalStorage';
import { UserStats, ClickSession, HotkeySession, DailyStats } from '../types';
import { getTodayDateString, calculateAverages } from '../utils/calculations';
import { STORAGE_KEYS, MAX_RECENT_SESSIONS } from '../utils/constants';

const INITIAL_STATS: UserStats = {
  totalSessions: 0,
  totalPlayTime: 0,
  bestCPM: 0,
  bestAccuracy: 0,
  averageCPM: 0,
  averageAccuracy: 0,
  dailyStats: {},
  recentSessions: []
};

const createEmptyDailyStats = (date: string): DailyStats => ({
  date,
  clickSessions: [],
  hotkeySessions: [],
  totalPlayTime: 0,
  bestCPM: 0,
  bestAccuracy: 0
});

export const useStats = () => {
  const [stats, setStats] = useLocalStorage<UserStats>(STORAGE_KEYS.STATS, INITIAL_STATS);

  const saveClickSession = (session: ClickSession) => {
    setStats(prevStats => {
      const today = getTodayDateString();
      const todayStats = prevStats.dailyStats[today] || createEmptyDailyStats(today);

      todayStats.clickSessions.push(session);
      todayStats.totalPlayTime += session.duration;
      todayStats.bestCPM = Math.max(todayStats.bestCPM, session.cpm);
      todayStats.bestAccuracy = Math.max(todayStats.bestAccuracy, session.accuracy);

      const recentSessions = [session, ...prevStats.recentSessions].slice(0, MAX_RECENT_SESSIONS);
      const { avgCPM, avgAccuracy } = calculateAverages(recentSessions);

      return {
        ...prevStats,
        totalSessions: prevStats.totalSessions + 1,
        totalPlayTime: prevStats.totalPlayTime + session.duration,
        bestCPM: Math.max(prevStats.bestCPM, session.cpm),
        bestAccuracy: Math.max(prevStats.bestAccuracy, session.accuracy),
        averageCPM: avgCPM,
        averageAccuracy: avgAccuracy,
        dailyStats: {
          ...prevStats.dailyStats,
          [today]: todayStats
        },
        recentSessions
      };
    });
  };

  const saveHotkeySession = (session: HotkeySession) => {
    setStats(prevStats => {
      const today = getTodayDateString();
      const todayStats = prevStats.dailyStats[today] || createEmptyDailyStats(today);

      todayStats.hotkeySessions.push(session);
      todayStats.totalPlayTime += session.duration;
      todayStats.bestAccuracy = Math.max(todayStats.bestAccuracy, session.accuracy);

      const recentSessions = [session, ...prevStats.recentSessions].slice(0, MAX_RECENT_SESSIONS);
      const { avgCPM, avgAccuracy } = calculateAverages(recentSessions);

      return {
        ...prevStats,
        totalSessions: prevStats.totalSessions + 1,
        totalPlayTime: prevStats.totalPlayTime + session.duration,
        bestAccuracy: Math.max(prevStats.bestAccuracy, session.accuracy),
        averageCPM: avgCPM,
        averageAccuracy: avgAccuracy,
        dailyStats: {
          ...prevStats.dailyStats,
          [today]: todayStats
        },
        recentSessions
      };
    });
  };

  const resetStats = () => {
    if (confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
      setStats(INITIAL_STATS);
    }
  };

  return {
    stats,
    saveClickSession,
    saveHotkeySession,
    resetStats
  };
};
