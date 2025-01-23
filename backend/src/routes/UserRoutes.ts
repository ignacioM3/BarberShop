import express from 'express'
import { UserControllers } from '../controllers/UserControllers'
import { authenticate } from '../middleware/auth'
import { body, param } from "express-validator";
import { handleInputErrors } from '../middleware/validation';


const router = express.Router()
router.use(authenticate)

router.get('/list-user' , UserControllers.getUsers)
router.delete('/:userId',
    param('userId').isMongoId().withMessage('ID no valido'), 
    handleInputErrors,
    UserControllers.deleteUser
    )
    
router.post('/block/:userId',
    param('userId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    UserControllers.blockUserById
)
router.post('/create-barber',
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('email').isEmail().withMessage('Email no es válido'),
    body('password').isLength({min: 8}).withMessage('El password debe tener al menos 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los Password no son iguales')
        }
        return true
    }),
    handleInputErrors,
    UserControllers.createUserBarber
)

router.get('/info/:userId', 
    param('userId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    UserControllers.getUserById
)

router.put('/:userId',
    param('userId').isMongoId().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    handleInputErrors,
    UserControllers.updateUser
)

router.post('/create-user',
    body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('email').isEmail().withMessage('Email no es válido'),
    body('password').isLength({min: 8}).withMessage('El password debe tener al menos 8 caracteres'),
    handleInputErrors,
    UserControllers.createUser
)



router.get('/list-barber', UserControllers.getBarbers)



export default router