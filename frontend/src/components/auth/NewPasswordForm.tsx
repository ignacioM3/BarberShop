import { useNavigate } from "react-router-dom"
import { NewPasswordFormType } from "../../types"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { updatePasswordWithTokenApi } from "../../api/AuthApi"
import { toast } from "react-toastify"
import { AppRoutes } from "../../routes"
import ErrorMessage from "../styles/ErrorMessage"

type NewPasswordFormProps = {
    token: string
}


export function NewPasswordForm({token}: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues : NewPasswordFormType = {
        password: '',
        password_confirmation: ''
    }

    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm({defaultValues: initialValues});

    const {mutate} = useMutation({
        mutationFn: updatePasswordWithTokenApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleNewPassword = (formData: NewPasswordFormType) => {
        const data = {
            formData,
            token
        }

        mutate(data)
        navigate(AppRoutes.login.route())
    }
    const password = watch('password')

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10 rounded-lg bg-gray-100 shadow-md mt-10 border-gray-300 border w-[400px] mx-auto"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingresa el password"
                        className="w-full p-2  border-gray-300 border rounded-sm"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "El password debe ser mínimo de 8 caracteres"
                            }
                        })}
                    />
                     {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Repetir Password
                    </label>
                    <input
                        id="password_confirmatio"
                        type="password"
                        placeholder="Ingresa el password"
                        className="w-full p-2  border-gray-300 border rounded-sm"
                        {...register('password_confirmation', {
                            required: "Repetir Password es obligatorio",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}

                    />
                      {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>
                <input
                    type="submit"
                    value="Establecer Password"
                    className="bg-gray-600 hover:bg-gray-700 w-full p-2  text-white font-black  text-xl cursor-pointer mt-4 rounded-md transition-colors"
                />
            </form>

        </>
    )
}