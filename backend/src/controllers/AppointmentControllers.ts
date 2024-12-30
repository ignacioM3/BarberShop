import type { Request, Response } from "express";
import Appointment from "../models/Appointment";
import Branch from "../models/Branch";

export class AppointmentControllers{
    static createAppointmentBarber = async (req: Request, res: Response) => {
        const {branchId} = req.params;
        try {
            const branch = await Branch.findById(branchId).populate('barbers');
            if (!branch) {
                const error = new Error("Local no encontrado");
                return res.status(404).json({ error: error.message });
              }
            const appointment = new Appointment(req.body);
            appointment.branchId = branch.id;
            appointment.manual = true;
            appointment.status = "booked";
            
            await appointment.save()
            res.send("Turno creado correctamente")
        } catch (error) {
            res.status(500).json({ error: "Hubo un error en el servidor" });
        }
    }

    static getTodayAppointment = async (req: Request, res: Response) => {
        const {branchId} = req.params;
        try {
            const branch = await Branch.findById(branchId).populate('barbers');
            if (!branch) {
                const error = new Error("Local no encontrado");
                return res.status(404).json({ error: error.message });
            }
            const today = new Date();
            const todayString = today.toISOString().split('T')[0]; 
            const todayDate = new Date(todayString); 

         
            const appointments = await Appointment.aggregate([
                { $match: { branchId: branch._id, day: todayDate } }, // Filtrar por sucursal y fecha
                {
                    $group: {
                        _id: "$barberId", // Agrupar por barbero
                        appointments: { $push: "$$ROOT" } // Incluir todos los turnos del barbero
                    }
                }
            ]);

            res.status(200).json({ branch, appointments });

        } catch (error) {
            res.status(500).json({ error: "Hubo un error en el servidor" });
        }
    }
}