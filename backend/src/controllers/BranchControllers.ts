import type { Request, Response } from "express";
import Branch from "../models/Branch";
import { userRole } from "../models/RoleUser";
import User from "../models/User";

export class BranchControllers {
  static createBranch = async (req: Request, res: Response) => {
    const { address, name } = req.body;
    const findAdress = await Branch.findOne({ address });
    const findName = await Branch.findOne({ name });
    if (findAdress || findName) {
      const error = new Error("Local ya registrado");
      return res.status(400).json({ error: error.message });
    }

    if (req.user.role !== userRole.admin) {
      const error = new Error("Acción no válida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const branch = new Branch(req.body);
      await branch.save();
      res.send("Local creado con exito");
    } catch (error) {
      console.log(error);
    }
  };

  static getBranchs = async (req: Request, res: Response) => {
    if (req.user.role !== userRole.admin) {
      const error = new Error("Acción no Válida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const listBranch = await Branch.find({});
      res.json(listBranch);
    } catch (error) {
      console.log(error);
    }
  };

  static getBranchById = async (req: Request, res: Response) => {
    const { branchId } = req.params;
    try {
      const branch = await Branch.findById(branchId);
      if (!branch) {
        const error = new Error("Local no encontrado");
        return res.status(404).json({ error: error.message });
      }

      res.status(200).json(branch);
    } catch (error) {
      console.log(error);
    }
  };

  static addBarberToBranch = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      //find barber
      const findBarber = await User.findById(id);
      if (!findBarber) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if (findBarber.role !== userRole.barber) {
        const error = new Error("No Autorizado");
        return res.status(401).json({ error: error.message });
      }

      if(req.branch.barbers.some(barber => barber.toString() === findBarber.id.toString())){
        const error = new Error('El barbero ya existe en el local');
        return res.status(409).json({error: error.message})
      }

      req.branch.barbers.push(findBarber.id);
      findBarber.branchId = req.branch.id


      
      await Promise.allSettled([findBarber.save(), req.branch.save()])
      res.send('Barbero agregado correctamente');
      
    } catch (error) {
        console.log(error)
    }
  };

  static removeBarberToBranch = async (req: Request, res: Response) => {
    try {
      const {barberId} = req.params;
      const findBarber = await User.findById(barberId);
      if (!findBarber) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if(!req.branch.barbers.some(barber => barber.toString() === findBarber.id.toString())){
        const error = new Error('El barbero no existe en el local');
        return res.status(409).json({error: error.message})
      }
      

      req.branch.barbers = req.branch.barbers.filter(barber => barber._id.toString() !== barberId)
      await req.branch.save();
      res.send('Barbero eliminado correctamente del local')
    } catch (error) {
      console.log(error)
    }
  }
}
