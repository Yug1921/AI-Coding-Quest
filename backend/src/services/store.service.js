import mongoose from 'mongoose';
import { challengeSeed } from '../data/challenges.js';
import { Challenge } from '../models/challenge.model.js';
import { Submission } from '../models/submission.model.js';

class InMemoryStore {
  constructor() {
    this.challenges = structuredClone(challengeSeed);
    this.submissions = [];
  }

  async getChallenges() {
    return this.challenges;
  }

  async getChallengeById(id) {
    return this.challenges.find((challenge) => challenge.id === id) ?? null;
  }

  async seedChallenges() {
    return this.challenges;
  }

  async createSubmission(payload) {
    const doc = { ...payload, createdAt: new Date().toISOString() };
    this.submissions.unshift(doc);
    return doc;
  }

  async getLeaderboard() {
    const totals = this.submissions.reduce((acc, submission) => {
      if (!submission.passed) return acc;
      acc[submission.userId] = (acc[submission.userId] ?? 0) + submission.earnedXp;
      return acc;
    }, {});

    return Object.entries(totals)
      .map(([userId, xp]) => ({ userId, xp }))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);
  }

  async getProgress(userId = 'guest') {
    const userSubmissions = this.submissions.filter((submission) => submission.userId === userId);
    const solved = new Set(userSubmissions.filter((s) => s.passed).map((s) => s.challengeId));
    const totalXp = userSubmissions.filter((s) => s.passed).reduce((sum, curr) => sum + curr.earnedXp, 0);

    return {
      userId,
      totalXp,
      solvedCount: solved.size,
      totalChallenges: this.challenges.length,
      completionRate: Math.round((solved.size / this.challenges.length) * 100)
    };
  }
}

class MongoStore {
  async getChallenges() {
    return Challenge.find().sort({ difficulty: 1, createdAt: 1 }).lean();
  }

  async getChallengeById(id) {
    return Challenge.findOne({ id }).lean();
  }

  async seedChallenges() {
    const count = await Challenge.countDocuments();
    if (count === 0) {
      await Challenge.insertMany(challengeSeed);
    }
    return Challenge.find().lean();
  }

  async createSubmission(payload) {
    return Submission.create(payload);
  }

  async getLeaderboard() {
    return Submission.aggregate([
      { $match: { passed: true } },
      { $group: { _id: '$userId', xp: { $sum: '$earnedXp' } } },
      { $project: { _id: 0, userId: '$_id', xp: 1 } },
      { $sort: { xp: -1 } },
      { $limit: 10 }
    ]);
  }

  async getProgress(userId = 'guest') {
    const submissions = await Submission.find({ userId, passed: true }).lean();
    const solved = new Set(submissions.map((submission) => submission.challengeId));
    const totalXp = submissions.reduce((sum, curr) => sum + curr.earnedXp, 0);
    const totalChallenges = await Challenge.countDocuments();

    return {
      userId,
      totalXp,
      solvedCount: solved.size,
      totalChallenges,
      completionRate: totalChallenges ? Math.round((solved.size / totalChallenges) * 100) : 0
    };
  }
}

const inMemoryStore = new InMemoryStore();
const mongoStore = new MongoStore();

export const getStore = () => (mongoose.connection.readyState === 1 ? mongoStore : inMemoryStore);
