import express, { Request, Response } from 'express';
import cors from 'cors';
import { CLIENT_URL } from './config/env'
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import middleware from './middleware';

const app = express();

app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use(express.json());

app.use(middleware.logging);

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

app.use(middleware.notFoundHandler);

export default app;