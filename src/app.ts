import express, { Request, Response } from 'express';
import healthRoutes from './routes/health';

const app = express();

app.use('/health', healthRoutes);

export default app;