import { transport } from "../config/nodemailer";

interface IEmail{
    email: string;
    name: string;
    token: string;
}

export class AuthEmail{
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transport.sendMail({
            from: 'Barber <admin@barber.com>',
            to: user.email,
            subject: "Barber - Confirma tu cuenta",
            text: "Barber - Confirma tu cuenta",
            html: `<p>Hola: ${user.name}, has creado tu cuenta en barber, ya casi estas listo, solo debes confirmar tu cuenta </p>
            <p>Visitando el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar Cuenta</a>
            <p>Ingresando el codigo: ${user.token}</p>
            <p>Este token expira en 10 minutos</p>

            `
        })
        console.log('Mensaje enviado:', info.messageId)
    }
    static sendPasswordResetToken = async (user: IEmail) => {
        const info = await transport.sendMail({
            from: 'Barber <admin@barber.com>',
            to: user.email, 
            subject: "Barber - Restablece tu password",
            text: "Barber - Restablece tu password",
            html: `<p>Hola: ${user.name}, has solicitado restablecer tu password:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer password</a>
            <p>E ingresa el código:<b>${user.token}<b></p>
            <p>Este token expira en 10 minutos</p>
            `
        })
        console.log('Mensaje enviado:', info.messageId)

    }
}