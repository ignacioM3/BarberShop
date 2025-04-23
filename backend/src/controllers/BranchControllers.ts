import type { Request, Response } from "express";
import Branch from "../models/Branch";
import { userRole } from "../models/RoleUser";
import User from "../models/User";

export class BranchControllers {
  static createBranch = async (req: Request, res: Response) => {
    const { address, name } = req.body;
    const findAddress = await Branch.findOne({ address });
    const findName = await Branch.findOne({ name });

    if (findAddress || findName) {
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
    try {
      const listBranch = await Branch.find({}).populate("barbers");
      res.json(listBranch);
    } catch (error) {
      console.log(error);
    }
  };

  static getBranchById = async (req: Request, res: Response) => {
    const { branchId } = req.params;
    try {
      const branch = await Branch.findById(branchId).populate("barbers");
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
      
      const findBarber = await User.findById(id);
      if (!findBarber) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if (findBarber.role !== userRole.barber) {
        const error = new Error("No Autorizado");
        return res.status(401).json({ error: error.message });
      }

      if (
        req.branch.barbers.some(
          (barber) => barber.toString() === findBarber.id.toString()
        )
      ) {
        const error = new Error("El barbero ya existe en el local");
        return res.status(409).json({ error: error.message });
      }

      req.branch.barbers.push(findBarber.id);
      findBarber.branch = req.branch.id;

      await Promise.allSettled([findBarber.save(), req.branch.save()]);
      res.send("Barbero agregado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static removeBarberToBranch = async (req: Request, res: Response) => {
    try {
      const { barberId } = req.params;
      const findBarber = await User.findById(barberId);
      if (!findBarber) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      if (
        !req.branch.barbers.some(
          (barber) => barber.toString() === findBarber.id.toString()
        )
      ) {
        const error = new Error("El barbero no existe en el local");
        return res.status(409).json({ error: error.message });
      }

      req.branch.barbers = req.branch.barbers.filter(
        (barber) => barber._id.toString() !== barberId
      );
      findBarber.branch = null;
      await Promise.allSettled([req.branch.save(), findBarber.save()]);
      res.send("Barbero eliminado correctamente del local");
    } catch (error) {
      console.log(error);
    }
  };

  static getBarberOutBranch = async (req: Request, res: Response) => {
    try {
      const barbers = await User.find({
        role: userRole.barber,
        branch: null,
      });

      if (!barbers) {
        const error = new Error("No hay barberos sin sucursal asignada");
        return res.status(404).json({ error: error.message });
      }
      res.json(barbers);
    } catch (error) {
      console.log(error);
    }
  };

  static deleteBranch = async (req: Request, res: Response) => {
    const { branchId } = req.params;

    if (req.user.role !== userRole.admin) {
      const error = new Error("Acción no valida");
      return res.status(404).json({ error: error.message });
    }
    
    await User.updateMany({ branch: branchId }, { $set: { branch: null } });
    await req.branch.deleteOne();
    res.send("Sucursal eliminada con exito");
  };

  static updateBranch = async (req: Request, res: Response) => {
    if (req.user.role !== userRole.admin) {
      const error = new Error("Acción no valida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const branchUpdated = await req.branch.updateOne(req.body);
      if (branchUpdated.modifiedCount === 0) {
        return res.status(400).json({ error: "No se realizaron cambios" });
      }

      return res.send("Sucursal actualizada correctamente")
      
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar la sucursal" });
    }
  };
}
