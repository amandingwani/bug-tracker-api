import express, { Request, Response } from 'express';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import middleware from './middleware';


const app = express();

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

app.use(middleware.notFoundHandler);

export default app;