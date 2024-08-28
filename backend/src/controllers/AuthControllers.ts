import type { Request , Response} from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import { generateJWT } from "../utils/jwt";

export class AuthControllers{
    static register = async (req: Request, res: Response) =>{
        try {
            const {password, email} = req.body;
            const existUser = await User.findOne({email})
            if(existUser){
                const error = new Error('El usuario ya registrado');
                return res.status(409).json({error: error.message});
            }

            const user = new User(req.body);       
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //falta enviar email

            await user.save();
            res.send('Cuenta creada correctamente');
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error en el servidor'})
        }
    }
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            console.log(email)
            console.log(user)
            if(!user){
                const error = new Error('Usuario no encontrado');
                return res.status(409).json({error: error.message});
            }

            if(!user.confirmed){
                const error = new Error("La cuenta no ha sido confirmada");
                return res.status(401).json({ error: error.message });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect){
                const error = new Error("Password Incorrecto");
                return res.status(401).json({ error: error.message });
            }

            const token = generateJWT({ id: user.id });
            res.send(token);

        } catch (error) {
            res.status(500).json({error: 'Hubo un error en el servidor'})
        }
    }
  
}