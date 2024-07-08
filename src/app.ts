import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth/authRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

/* app.use(errorHandler);
 */
export default app;
