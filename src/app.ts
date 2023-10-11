import express, { Request, Response } from 'express';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

export default app;