
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { toast } from "react-toastify";

export function ConfirmAccount() {
    const [token, setToken] = useState<string>('')
    const handleChange = (token: string) => {
        setToken(token)
    }
    const handleComplete = () =>{
        toast.success("completado")
    }
    return (
        <div className="my-5">
            <h1 className="text-center text-4xl font-black lg:text-2xl">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">Ingresa el codigo que recibiste {' '}
                <span className="text-gray-500 font-bold">por email</span>
            </p>
            <form action="" className="mt-5">
                <label htmlFor="" className="font-normal text-2xl text-center block mb-4">Código de 6 digitos</label>
                <div className="flex justify-center gap-3 md:gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={AppRoutes.requestConfirmationCode.route()}
                    className="text-center text-gray-400 font-normal hover:text-gray-500 transition-colors"
                >
                    Solicitar un nuevo Código
                </Link>
                <Link
                    className="text-center text-gray-400 font-normal hover:text-gray-500 transition-colors"
                    to={AppRoutes.forgotPassword.route()}
                    >
                    ¿Olvidaste tu contraseña? <span className="text-gray-500 font-bold">Reestablecer</span>
                </Link>
            </nav>
        </div>
    )
}
