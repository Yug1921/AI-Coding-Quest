import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use('/api', routes);

export default app;
