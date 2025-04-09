import type { Request, Response } from "express";
import Branch from "../models/Branch";

export class PublicBranchControllers{
    static getBranchs = async (req: Request, res: Response) => {
        try {
            const listBranch = await Branch.find({}).select('id name adress open close prices')
            res.json(listBranch)
        } catch (error) {
            console.log(error)
        }
    }
}