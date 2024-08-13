import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db';
import morgan from 'morgan';
import authRoutes from './routes/AuthRoutes'


dotenv.config();
connectDB()

const app = express()

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)

export default app