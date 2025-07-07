import cors from 'cors';
import { config } from 'dotenv';
import express, { Express } from 'express';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/error-handler';
import noteRoutes from './routes/note.routes';
import userRoutes from './routes/user.routes';

config();

const app: Express = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(errorHandler);

const PORT: number = parseInt(
  process.env.PORT || '5000',
  10,
);
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);
