import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createBarberApi } from "../../../api/BarberApi";
import { UserCreateForm } from "../../../types";
import { TitleModal } from "../TitleModal";
import ErrorLabel from "../../styles/ErrorLabel";

interface UserBarberModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CreateBarberModal({ open, setOpen }: UserBarberModalProps) {
    const initialValues = {
        name: "",
        number: "",
        password_confirmation: "",
        password: "",
        email: ""
    }

    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    const password = watch('password');
    const { mutate } = useMutation({
        mutationFn: createBarberApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['getBarbers'] })
            setOpen(false)
            reset()
        }
    })

    const handleCreateBarber = (formData: UserCreateForm) => {
        mutate(formData);
    }

    return (
        <div
            className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={() => setOpen(false)}
        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit(handleCreateBarber)}
                    className="bg-white w-[350px]  md:w-[400px] shadow-md rounded-md p-7 mt-8 md:mt-4"
                >
                    <TitleModal>Crear Barbero</TitleModal>
                    <div className="my-2">
                        <label
                            htmlFor="name"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            nombre
                            {errors.name && (
                            <ErrorLabel>
                                {errors.name.message}
                            </ErrorLabel>
                        )}
                        </label>
                        <input
                            {...register("name", {
                                required: "El nombre es obligatorio",
                            })}
                            type="text"
                            id="name"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Nombre"
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="number"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Número
                            {
                            errors.number && (
                                <ErrorLabel>
                                    {errors.number?.message}
                                </ErrorLabel>
                            )
                        }
                        </label>
                        <input
                            {
                            ...register('number', {
                                required: 'El numero es obligatorio'
                            })
                            }
                            type="number"
                            id="number"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Numero"
                        />
                       
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="email"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Email
                            {
                            errors.email && (
                                <ErrorLabel>
                                    {errors.email?.message}
                                </ErrorLabel>
                            )
                        }
                        </label>
                        <input
                            {
                            ...register('email', {
                                required: 'El numero es obligatorio',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no válido"
                                }
                            })
                            }
                            type="email"
                            id="email"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el email"
                        />
                      
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Password
                            {
                            errors.password && (
                                <ErrorLabel>
                                    {errors.password?.message}
                                </ErrorLabel>
                            )
                        }
                        </label>
                        <input
                            {
                            ...register('password', {
                                required: 'El password es obligatorio'
                            })
                            }
                            type="password"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="password"
                            placeholder="Ingresa el password"
                        />
               
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="password_confirmation"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Repeti el password
                            {errors.password_confirmation && (
                            <ErrorLabel className="text-[13px]">{errors.password_confirmation.message}</ErrorLabel>
                        )}
                        </label>
                        <input
                            {...register("password_confirmation", {
                                required: "Password Incorrecto",
                                validate: value => value === password || 'Los Passwords no son iguales'
                            })}
                            type="password"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="password_confirmation"
                            placeholder="Repita el password"
                        />
                     
                    </div>
                    <div className="flex gap-4 mt-4">
                        <input
                            type="button"
                            value="Cancelar"
                            className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                            onClick={() => setOpen(false)}
                        />
                        <input
                            type="submit"
                            className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                            value="Crear Usuario"
                        />

                    </div>
                </form>
            </div>
        </div>
    )
}
