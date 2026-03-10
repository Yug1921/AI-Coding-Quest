import { Router } from 'express';
import { getChallenge, listChallenges } from '../controllers/challenges.controller.js';
import { askMentor, submitSolution } from '../controllers/submissions.controller.js';
import { getLeaderboard, getProgress } from '../controllers/users.controller.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));
router.get('/challenges', listChallenges);
router.get('/challenges/:id', getChallenge);
router.post('/submissions', submitSolution);
router.post('/mentor', askMentor);
router.get('/users/progress', getProgress);
router.get('/leaderboard', getLeaderboard);

export default router;
