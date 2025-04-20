
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { confirmAccountApi } from "../../api/AuthApi";
import { ConfirmToken } from "../../types";
import useAuth from "../../hooks/useAuth";

export function ConfirmAccount() {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const navigate = useNavigate()

    const {currentUser} = useAuth()
    useEffect(() => {
        if(currentUser) {
            navigate(AppRoutes.home.route())
        }
    }, [currentUser]);

    
    const {mutate} = useMutation({
        mutationFn: confirmAccountApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setTimeout(() => {
                navigate(AppRoutes.login.route()) 
            }, 2000)
            setToken("")
        }
    })
    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
        
    }
    const handleComplete = (token: ConfirmToken['token']) =>{
        mutate({token})
    }
    if(!currentUser) return (
        <div className="my-5 md:mt-[100px] mt-[100px]">
            <h1 className="text-center text-4xl font-black lg:text-2xl">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">Ingresa el codigo que recibiste {' '}
                <span className="text-gray-500 font-bold">por email</span>
            </p>
            <form action=""   >
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
                    className="text-center text-gray-700 font-normal hover:text-gray-500 transition-colors"
                >
                    Solicitar un nuevo Código
                </Link>
                <Link
                    className="text-center text-gray-700 font-normal hover:text-gray-500 transition-colors"
                    to={AppRoutes.forgotPassword.route()}
                    >
                    ¿Olvidaste tu contraseña? <span className="font-bold hover:font-gray-400">Reestablecer</span>
                </Link>
            </nav>
        </div>
    )
}
