import express from 'express'
import { AuthControllers } from '../controllers/AuthControllers';

const router = express.Router();


router.post('/create-account', AuthControllers.register);



export default router