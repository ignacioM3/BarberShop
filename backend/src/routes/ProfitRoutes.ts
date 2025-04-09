import express from 'express'
import { authenticate } from '../middleware/auth'
import {  query } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { ProfitControllers } from '../controllers/ProfitControllers'

const router = express.Router()
router.use(authenticate)

router.get(
    '/',
    query('year').isInt({ min: 2000 }).withMessage('El año es inválido'),
    query('month').isInt({ min: 1, max: 12 }).withMessage("El mes debe ser un número entre 1 y 12"),
    handleInputErrors,
    ProfitControllers.getAllProfit
);

router.get('/by-year',
    query('year').isInt({ min: 2000 }).withMessage('El año es inválido'),
    ProfitControllers.getMonthlyProfit
)


export default router