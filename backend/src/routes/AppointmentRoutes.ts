import express from 'express'
import { AppointmentControllers } from '../controllers/AppointmentControllers';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = express.Router();
router.use(authenticate)

router.post("/:branchId/create-appointment",
    param("branchId").isMongoId().withMessage("ID no válido"),
    body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
    body("timeSlot").notEmpty().withMessage("Debe ingresar el horario"),
    body("day").notEmpty().withMessage("Debe ingresar el dia del turno"),
    handleInputErrors,
    AppointmentControllers.createAppointmentBarber
)
router.get("/:branchId/today",
    param("branchId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    AppointmentControllers.getTodayAppointment
)

router.get("/:appointmentId", 
    param("appointmentId").isMongoId().withMessage("ID no válido"),
    AppointmentControllers.getAppointmentById)
export default router