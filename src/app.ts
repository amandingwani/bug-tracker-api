import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import healthRoutes from './routes/health';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use('/health', healthRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});