import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/jwt";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../email/AuthEmail";

export class AuthControllers {
  static register = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;
      const existUser = await User.findOne({ email });
      if (existUser) {
        const error = new Error("El usuario ya registrado");
        return res.status(409).json({ error: error.message });
      }

      const user = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });
      await Promise.allSettled([user.save(), token.save()]);
      res.send("Revista tu email para terminar de confirmar tu cuenta");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error en el servidor" });
    }
  };
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        const error = new Error("Password Incorrecto");
        return res.status(401).json({ error: error.message });
      }
      if(user.blocked){
        const error = new Error("Usuario Bloqueado comunicarse con el administrador");
        return res.status(403).json({error: error.message})
      }

      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = generateToken();
        await token.save();
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          token: token.token,
          name: user.name,
        });

        const error = new Error(
          "La cuenta no ha sido confirmada, hemos enviado un email de confirmación"
        );
        return res.status(401).json({ error: error.message });
      }

   
      const token = generateJWT({ id: user.id });
      res.send(token);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error en el servidor" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no valido");
        return res.status(404).json({ error: error.message });
      }
      const user = await User.findById(tokenExists.user);
      user.confirmed = true;
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.send("Cuenta confirmada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ error: error.message });
    }
    if (user.confirmed) {
      const error = new Error("El usuario ya esta confirmado");
      return res.status(403).json({ error: error.message });
    }
    const token = new Token();
    token.token = generateToken();
    token.user = user.id;

    AuthEmail.sendConfirmationEmail({
      email: user.email,
      name: user.name,
      token: token.token,
    });
    await Promise.allSettled([user.save(), token.save()]);
    res.send("Se envio un nuevo token a tu email");
  };
  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("El usuario no esta registrado");
        return res.status(404).json({ error: error.message });
      }

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;
      await token.save();
      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      });
      res.send("Revisa tu email para las intrucciones");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no valido");
        return res.status(404).json({ error: error.message });
      }

      res.send("Token valido define tu nuevo password");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token no valido");
        return res.status(404).json({ error: error.message });
      }

      const user = await User.findById(tokenExists.user);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res.send("El password se modifico correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static user = async (req: Request, res: Response) => {
    return res.json(req.user)
  }

  static updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if(!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }
      if(req.user.id !== user.id) {
        const error = new Error("No autorizado");
        return res.status(401).json({ error: error.message });
      }
      const {  instagram, number, address } = req.body;
      if (instagram) user.instagram = instagram;
      if (number) user.number = number;
      if (address) user.address = address;
      await user.save();
      
      return res.send("Perfil actualizado correctamente")

    } catch (error) {
      res.status(500).json({ error: "Hubo un error en el servidor" });
    }
  }

}
