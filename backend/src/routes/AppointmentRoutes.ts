import express from 'express'
import { AppointmentControllers } from '../controllers/AppointmentControllers';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import { appointmentStatus } from '../models/AppointmentStatus';

const router = express.Router();
router.use(authenticate)

router.post("/:branchId/create-appointment",
    param("branchId").isMongoId().withMessage("ID no válido"),
    body('barberId').isMongoId().withMessage('ID no válido'),
    body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
    body("timeSlot").notEmpty().withMessage("Debe ingresar el horario"),
    body("day").notEmpty().withMessage("Debe ingresar el dia del turno"),
    body("service").notEmpty().withMessage("Debe ingresar el servicio"),
    body("price").notEmpty().withMessage("Debe ingresar el precio"),
    handleInputErrors,
    AppointmentControllers.createAppointment
)



router.get("/:branchId/today",
    param("branchId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    AppointmentControllers.getTodayAppointment
)

router.get("/:appointmentId", 
    param("appointmentId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    AppointmentControllers.getAppointmentById)

router.post("/:appointmentId/update-status",
    param("appointmentId").isMongoId().withMessage("ID no válido"),
    body("status").isIn([appointmentStatus.canceled, appointmentStatus.completed]).withMessage("Estado no válido"),
    handleInputErrors,
    AppointmentControllers.updateStatusAppointment
)

router.delete("/:appointmentId/delete", 
    param("appointmentId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    AppointmentControllers.deleteAppointment)

router.get("/:branchId/week/:appointmentDay",
    param("branchId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    AppointmentControllers.getAppointmentByDay
)

export default router