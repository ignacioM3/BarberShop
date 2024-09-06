import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db';
import morgan from 'morgan';
import authRoutes from './routes/AuthRoutes'
import userRoutes from './routes/UserRoutes'
import cors from 'cors'


dotenv.config();
connectDB()

const app = express()

app.use(cors())

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app