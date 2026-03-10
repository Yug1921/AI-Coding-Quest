import mongoose from 'mongoose';

export const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('No MONGO_URI configured. Using in-memory data store.');
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected.');
    return true;
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}. Falling back to in-memory store.`);
    return false;
  }
};
