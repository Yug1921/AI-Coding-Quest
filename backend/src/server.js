import 'dotenv/config';
import app from './app.js';
import { connectDb } from './config/db.js';
import { getStore } from './services/store.service.js';

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDb();
  await getStore().seedChallenges();
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
};

start();
