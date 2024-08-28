import type { Request , Response} from "express";
import { userRole } from "../models/RoleUser";
import User from "../models/User";


export class UserControllers{
    static getUsers = async (req: Request, res: Response) =>{
       if(req.user.role !== userRole.admin && req.user.role !== userRole.barber){
        const error = new Error('Acción no Válida');
        return res.status(404).json({error: error.message})
       }
       
      try {
        const listUsers = await User.find({
            $or: [
                {role: {$in: userRole.barber}},
                {role: {$in: userRole.client}}
            ]
           })
           res.json(listUsers)
      } catch (error) {
        console.log(error)
      }
    }

    static getUserById = async (req: Request, res: Response)=> {
        const {id} = req.params;
        try {
            const user = await User.findById(id).select('id name email');
            if(!user){
                const error = new Error('Usuario no encontrado');
                return res.status(404).json({error: error.message})
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error)
        }
    } 

    static deleteUser = async (req: Request, res: Response) => {
        const {userId} = req.params;

        const findUser = await User.findById(userId)
        if(!findUser){
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({error: error.message});
        }

        if(req.user.role !== userRole.admin && req.user.role !== userRole.barber){
            const error = new Error('Acción no valida')
            return res.status(404).json({error: error.message})
        }

        await findUser.deleteOne();
        res.send('Usuario eliminado')   
    }

    static updateUser = async (req: Request, res: Response) => {
        const {userId} = req.params;
        const findUser = await User.findById(userId)
        if(!findUser){
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({error: error.message});
        }
        if(req.user.role !== userRole.admin || req.user.id !== findUser.id){
            const error = new Error('Acción no valida')
            return res.status(404).json({error: error.message})
        }

        findUser.name = req.body.name;
        await findUser.save();
        res.send('Usuario Actualizado')
    }
}