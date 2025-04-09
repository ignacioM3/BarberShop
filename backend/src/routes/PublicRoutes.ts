import express from 'express';
import { PublicBranchControllers } from '../controllers/PublicControllers';

const router = express.Router();


router.get('/branchs', PublicBranchControllers.getBranchs)

export default router