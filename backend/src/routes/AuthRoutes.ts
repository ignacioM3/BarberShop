import express from 'express'
import { AuthControllers } from '../controllers/AuthControllers';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';

const router = express.Router();


router.post('/create-account',
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('password').isLength({min: 8}).withMessage('el password debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los password deben ser iguales')
        }
        return true;
    }),
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthControllers.register
);

router.post('/login', 
    body("email").isEmail().withMessage("Email no valido"),
    body("password").notEmpty().withMessage("El password no puede ir vacio"),
    handleInputErrors,
    AuthControllers.login
)


export default router