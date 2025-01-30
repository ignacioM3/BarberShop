import type { Request, Response } from 'express';
import Appointment from '../models/Appointment';

export class ProfitControllers {
    static getAllProfit = async (req: Request, res: Response) => {
        try {
            const { year, month } = req.query;

            if (!year || !month) {
                const error = new Error('Se requieren los parámetros year y month');
                return res.status(400).json({ error: error.message });
            }

            const startDate = new Date(Number(year), Number(month) - 1, 1);
            const endDate = new Date(Number(year), Number(month), 0);

            const profits = await Appointment.aggregate([
                {
                    $match: {
                        status: "completed",
                        day: {
                            $gte: startDate.toISOString().split('T')[0],
                            $lte: endDate.toISOString().split('T')[0],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$branchId",
                        totalProfit: { $sum: "$price" },
                        appointments: { $push: "$$ROOT" },
                    },
                },
                {
                    $lookup: {
                        from: "branches", 
                        localField: "_id",
                        foreignField: "_id",
                        as: "branchInfo",
                    },
                },
                {
                    $unwind: "$branchInfo",
                },
                {
                    $project: {
                        _id: 0,
                        branchId: "$_id",
                        branchName: "$branchInfo.name",
                        totalProfit: 1,
                        appointments: 1,
                    },
                },
            ]);

            return res.status(200).json(profits);
        } catch (error) {
            console.error('Error al obtener las ganancias:', error);
            return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    };

    static getMonthlyProfit = async (req: Request, res: Response) => {
        try {
            const { year } = req.query;

            if (!year) {
                return res.status(400).json({ error: 'Se requiere el parámetro year' });
            }

            const profits = await Appointment.aggregate([
                {
                    $match: {
                        status: "completed",
                        day: {
                            $gte: `${year}-01-01`,
                            $lte: `${year}-12-31`,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            branchId: "$branchId",
                            month: { $month: { $dateFromString: { dateString: "$day" } } }
                        },
                        totalProfit: { $sum: "$price" },
                    },
                },
                {
                    $lookup: {
                        from: "branches", 
                        localField: "_id.branchId",
                        foreignField: "_id",
                        as: "branchInfo",
                    },
                },
                {
                    $unwind: "$branchInfo",
                },
                {
                    $project: {
                        _id: 0,
                        branchId: "$_id.branchId",
                        branchName: "$branchInfo.name",
                        month: "$_id.month",
                        totalProfit: 1,
                    },
                },
                {
                    $sort: { month: 1 } // Ordenar por mes ascendente
                }
            ]);

            return res.status(200).json(profits);
            
        } catch (error) {
            console.error('Error al obtener las ganancias:', error);
            return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
        }
    }
}