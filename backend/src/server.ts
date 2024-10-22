import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db';
import morgan from 'morgan';
import authRoutes from './routes/AuthRoutes'
import userRoutes from './routes/UserRoutes'
import branchRoutes from './routes/BranchRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors';


dotenv.config();
connectDB()

const app = express()

app.use(cors(corsConfig))

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/branch', branchRoutes)

export default app