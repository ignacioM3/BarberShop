import type { Request, Response } from "express";
import { userRole } from "../models/RoleUser";
import User from "../models/User";
import bcrypt from 'bcrypt';

export class UserControllers {
  static getUsers = async (req: Request, res: Response) => {
    if (req.user.role !== userRole.admin && req.user.role !== userRole.barber) {
      const error = new Error("Acción no Válida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const skip = (page - 1) * limit;

      const totalUsers = await User.countDocuments({
        $or: [{ role: { $in: userRole.client } }],
      });

      const listUsers = await User.find({
        $or: [{ role: { $in: userRole.client } }],
      })
        .skip(skip)
        .limit(limit);
      res.json({
        users: listUsers,
        totalUsers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getBarbers = async (req: Request, res: Response) => {
    if (req.user.role !== userRole.admin && req.user.role !== userRole.barber) {
      const error = new Error("Acción no Válida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;

      const skip = (page - 1) * limit;

      const totalUsers = await User.countDocuments({
        $or: [{role: {$in: userRole.barber}}]
      })

      const listUsers = await User.find({
        $or: [{ role: { $in: userRole.barber } }],
      })
        .skip(skip)
        .limit(limit)
        .populate('branch')
      res.json({
        users: listUsers,
        totalUsers

      });
    } catch (error) {
      console.log(error);
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).select("id name email instagram number");
      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const findUser = await User.findById(userId);
    if (!findUser) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ error: error.message });
    }

    if (req.user.role !== userRole.admin && req.user.role !== userRole.barber) {
      const error = new Error("Acción no valida");
      return res.status(404).json({ error: error.message });
    }

    await findUser.deleteOne();
    res.send("Usuario eliminado");
  };

  static updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;


    try {
      const findUser = await User.findById(userId);
      if (!findUser) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      if (req.user.role !== userRole.admin) {
        const error = new Error("Acción no valida");
        return res.status(404).json({ error: error.message });
      }
     
  
      const userUpdated = await findUser.updateOne(req.body);
      if(userUpdated.modifiedCount === 0){
        return res.status(400).json({ error: "No se realizaron cambios" });
      }
      
      res.send("Usuario Actualizado");
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar barbero" });
    }
  };

  static createUserBarber = async (req: Request, res: Response) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ error: error.message });
    }

    if (req.user.role !== userRole.admin && req.user.role !== userRole.barber) {
      const error = new Error("Acción no valida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const user = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.confirmed = true;
      user.role = userRole.barber;
      
      await user.save();

      res.send("Usuario Creado Correctamente" );
    } catch (error) {
      console.log(error);
    }
  };

  static blockUserById = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const findUser = await User.findById(userId)
    if (!findUser) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ error: error.message });
    }

    if (req.user.role !== userRole.admin) {
      const error = new Error("Acción no valida");
      return res.status(404).json({ error: error.message });
    }

    findUser.blocked = !findUser.blocked;
    await findUser.save();
    res.send("Usuario Bloqueado")

  }

  static createUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ error: error.message });
    }

    if (req.user.role !== userRole.admin && req.user.role !== userRole.barber) {
      const error = new Error("Acción no valida");
      return res.status(404).json({ error: error.message });
    }

    try {
      const user = new User(req.body);
      user.role = userRole.client;
      user.confirmed = true;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      
      await user.save();

      res.send("Usuario Creado Correctamente" );
    } catch (error) {
      console.log(error);
    }
  };

}


