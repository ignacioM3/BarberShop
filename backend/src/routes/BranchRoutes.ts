import express from 'express'
import { authenticate } from '../middleware/auth';
import { BranchControllers } from '../controllers/BranchControllers';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { BranchExists } from '../middleware/branch';

const router = express.Router();
router.use(authenticate);
router.param("branchId", BranchExists)

router.post('/create-branch',
    body('name').notEmpty().withMessage('El nombre puede estar vació'),
    body('address').notEmpty().withMessage('La dirreción no puede estar vacia'),
    handleInputErrors,
    BranchControllers.createBranch);


router.get('/get-branchs', BranchControllers.getBranchs)
router.get('/get-barbers', BranchControllers.getBarberOutBranch)
router.get('/info/:branchId', 
    param('branchId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    BranchControllers.getBranchById)
router.post("/:branchId/add-barber", 
    body('id').isMongoId().withMessage('ID inválido'),
    handleInputErrors,
    BranchControllers.addBarberToBranch)

router.delete('/:branchId/remove-barber/:barberId', 
    handleInputErrors,
    BranchControllers.removeBarberToBranch
)

router.delete('/:branchId',
    handleInputErrors,
    BranchControllers.deleteBranch
)

export default router;