import { getStore } from '../services/store.service.js';

export const getProgress = async (req, res) => {
  const userId = req.query.userId || 'guest';
  const store = getStore();
  const progress = await store.getProgress(userId);
  res.json(progress);
};

export const getLeaderboard = async (_req, res) => {
  const store = getStore();
  const leaderboard = await store.getLeaderboard();
  res.json(leaderboard);
};
