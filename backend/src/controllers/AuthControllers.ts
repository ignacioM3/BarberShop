import { Request , Response} from "express";
import User from "../models/User";

export class AuthControllers{
    static register = async (req: Request, res: Response) =>{
        try {
            const {passwrod, email} = req.body;
            const existUser = await User.findOne({email})
            if(existUser){
                const error = new Error('El usuario ya registrado');
                return res.status(409).json({error: error.message});
            }

            const user = new User(req.body);
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en el servidor'})
        }
    }
}