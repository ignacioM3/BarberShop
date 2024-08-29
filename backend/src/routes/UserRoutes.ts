import express from 'express'
import { UserControllers } from '../controllers/UserControllers'
import { authenticate } from '../middleware/auth'
import { body, param } from "express-validator";
import { handleInputErrors } from '../middleware/validation';


const router = express.Router()

router.get('/list-user' ,authenticate, UserControllers.getUsers)
router.delete('/:userId',
    param('userId').isMongoId().withMessage('ID no valido'),
    authenticate, 
    handleInputErrors,
    UserControllers.deleteUser
    )
router.get('/create-barber',
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('email').isEmail().withMessage('Email no es válido'),
    body('password').isLength({min: 8}).withMessage('El password debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    authenticate,
    handleInputErrors,
    UserControllers.createUserBarber
)

router.get('/:userId', 
    param('userId').isMongoId().withMessage('ID no valido'),
    authenticate,
    handleInputErrors,
    UserControllers.getUserById
)


export default router