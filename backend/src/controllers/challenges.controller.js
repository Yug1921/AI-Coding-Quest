import { getStore } from '../services/store.service.js';

export const listChallenges = async (_req, res) => {
  const store = getStore();
  const challenges = await store.getChallenges();
  res.json(challenges);
};

export const getChallenge = async (req, res) => {
  const store = getStore();
  const challenge = await store.getChallengeById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  return res.json(challenge);
};
