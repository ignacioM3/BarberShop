import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { RequestConfirmationCodeForm } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCodeApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/styles/ErrorMessage";


export function RequestConfirmationCode() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ""
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: initialValues
    })

    const {mutate} = useMutation({
        mutationFn: requestConfirmationCodeApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            toast.success(data)
        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

  return (
    <div className="my-5">
        <h1 className="text-4xl font-black text-center lg:text-2xl">Solicita Codigo de Confirmación</h1>
        <p className="text-2xl font-light mt-4 text-center lg:text-xl lg:mt-2">Coloca tu email para recibir {' '}
            <span>un nuevo código</span>
        </p>
        <form 
             onSubmit={handleSubmit(handleRequestCode)}
             className=" p-10 max-w-[650px] mx-auto  bg-gray-100 mt-5 shadow-md rounded-sm  lg:max-w-[450px]"
            >
            <div className="flex flex-col gap-5 lg:gap-3 mb-2">
                <label 
                    htmlFor="email"
                    className="font-normal text-2xl"
                    >
                    Email
                </label>
                <input 
                    type="email"  
                    id="email" 
                    placeholder="Email de Registro"
                    className="w-full p-3 rounded-lg border borde-gray-300"
                    {...register("email",{
                        required: "El email es obligatorio",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "E-mail no válido",
                        },
                    })}
                    />
                    {errors.email && (
                        <ErrorMessage>
                            {errors.email.message}
                        </ErrorMessage>
                    )}
            </div>
            <input 
                type="submit" 
                value="Enviar Código" 
                className="bg-gray-600 rounded-md hover:bg-gray-700 w-full p-3 text-white font-black text-xl cursor-pointer mt-8"
                />
        </form>
        <nav className="flex flex-col mt-5 space-y-4">
            <Link
                to={AppRoutes.login.route()}
                className="text-center text-gray-500 font-normal"
                >
                ¿Ya tienes una cuenta? <span className="text-gray-500 font-bold">Iniciar Sesión</span>
            </Link>
            <Link
                className="text-center text-gray-500 font-normal"
                to={AppRoutes.forgotPassword.route()}
                >
            ¿Olvidaste tu contraseña? <span className="text-gray-500 font-bold">Restablecer</span>
            </Link>
        </nav>
    </div>
  )
}

