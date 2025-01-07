import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createBarberApi } from "../../api/BarberApi";
import { UserCreateForm } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { TitleModal } from "./TitleModal";

interface UserBarberModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function UserBarberModal({ open, setOpen }: UserBarberModalProps) {
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
                            className="uppercase text-gray-600 block font-bold"
                        >
                            nombre
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
                        {errors.name && (
                            <ErrorMessage>
                                {errors.name.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="number"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Número
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
                        {
                            errors.number && (
                                <ErrorMessage>
                                    {errors.number?.message}
                                </ErrorMessage>
                            )
                        }
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="email"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Email
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
                        {
                            errors.email && (
                                <ErrorMessage>
                                    {errors.email?.message}
                                </ErrorMessage>
                            )
                        }
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Password
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
                        {
                            errors.password && (
                                <ErrorMessage>
                                    {errors.password?.message}
                                </ErrorMessage>
                            )
                        }
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="password_confirmation"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Repeti el password
                        </label>
                        <input
                            {...register("password_confirmation", {
                                required: "Repetir Password es obligatorio",
                                validate: value => value === password || 'Los Passwords no son iguales'
                            })}
                            type="password"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="password_confirmation"
                            placeholder="Repita el password"
                        />
                        {errors.password_confirmation && (
                            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <input
                            type="submit"
                            className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                            value="Crear Usuario"
                        />
                        <input
                            type="button"
                            value="Cancelar"
                            className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                            onClick={() => setOpen(false)}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
