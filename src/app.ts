import express, { Request, Response } from 'express';
import cors from 'cors';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import middleware from './middleware';


const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

app.use(middleware.notFoundHandler);

export default app;