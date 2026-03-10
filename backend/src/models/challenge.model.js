import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    xp: { type: Number, required: true },
    starterCode: { type: String, required: true },
    testCases: {
      type: [
        {
          input: { type: mongoose.Schema.Types.Mixed, required: true },
          output: { type: mongoose.Schema.Types.Mixed, required: true }
        }
      ],
      required: true
    },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export const Challenge = mongoose.model('Challenge', challengeSchema);
