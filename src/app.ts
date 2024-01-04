import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CLIENT_URL } from './config/env';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import projectsRoutes from './routes/projects';
import ticketsRoutes from './routes/tickets';
import { logging, notFoundHandler } from './middleware';

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(express.json());

app.use(logging);

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/projects', projectsRoutes);
app.use('/tickets', ticketsRoutes);

app.use(notFoundHandler);

export default app;
