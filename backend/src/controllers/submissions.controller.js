import { generateHint } from '../services/ai.service.js';
import { runAgainstTests } from '../services/codeRunner.service.js';
import { getStore } from '../services/store.service.js';

export const submitSolution = async (req, res) => {
  const { challengeId, code, userId = 'guest' } = req.body;
  if (!challengeId || !code) {
    return res.status(400).json({ message: 'challengeId and code are required' });
  }

  const store = getStore();
  const challenge = await store.getChallengeById(challengeId);

  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }

  const result = runAgainstTests({ code, testCases: challenge.testCases });
  const earnedXp = result.passed ? challenge.xp : 0;
  const hint = await generateHint({ challenge, code, result, askMode: 'submission' });

  const saved = await store.createSubmission({
    challengeId,
    userId,
    code,
    passed: result.passed,
    testResults: result.testResults,
    earnedXp
  });

  return res.json({
    submissionId: saved._id ?? saved.createdAt,
    passed: result.passed,
    runtimeError: result.error,
    earnedXp,
    testResults: result.testResults,
    hint
  });
};

export const askMentor = async (req, res) => {
  const { challengeId, code = '', userId = 'guest' } = req.body;
  const store = getStore();
  const challenge = await store.getChallengeById(challengeId);

  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }

  const syntheticResult = {
    passed: false,
    testResults: [],
    note: `Mentor requested by ${userId}`
  };

  const hint = await generateHint({
    challenge,
    code,
    result: syntheticResult,
    askMode: 'mentor'
  });

  return res.json(hint);
};
