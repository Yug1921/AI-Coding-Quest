import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    challengeId: { type: String, required: true },
    userId: { type: String, default: 'guest' },
    code: { type: String, required: true },
    passed: { type: Boolean, required: true },
    testResults: [
      {
        input: mongoose.Schema.Types.Mixed,
        expected: mongoose.Schema.Types.Mixed,
        actual: mongoose.Schema.Types.Mixed,
        passed: Boolean,
        error: String
      }
    ],
    earnedXp: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Submission = mongoose.model('Submission', submissionSchema);
