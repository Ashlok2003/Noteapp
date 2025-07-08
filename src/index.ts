import cors from 'cors';
import { config } from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/error-handler';
import noteRoutes from './routes/note.routes';
import userRoutes from './routes/user.routes';

config();

const app: Express = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://your-production-domain.com',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
