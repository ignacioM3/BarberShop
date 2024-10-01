import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createUserApi } from "../../api/AuthApi";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";

interface UserModalInterface {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function UserModal({ open, setOpen }: UserModalInterface) {
    const initialValues = {
        name: "",
        number: "",
        password: "",
        email: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm(
        { defaultValues: initialValues }
    )

    const { mutate } = useMutation({
        mutationFn: createUserApi,
        onError: (error) => {
            toast.error(error.message)
            toast.success('Usuario Creado correctamente')
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleCreate = async () => {
        
    }
    return (
        <div
            className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={() => setOpen(false)}
        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit(handleCreate)}
                    className="bg-white w-[400px] shadow-md rounded-md p-7 mt-4"
                >
                    <h1 className="text-center text-xl font-bold text-gray-600 border-b border-gray-600 pb-3">Crear Usuario</h1>
                    <div className="my-2">
                        <label htmlFor="dni" className="uppercase text-gray-600 block font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            {
                            ...register('name', {
                                required: 'El nombre es obligatorio'
                            })
                            }
                            id="name"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            placeholder="Ingrese el Nombre"
                        />
                           {
                            errors.name && (
                                <ErrorMessage>
                                    {errors.name?.message}
                                </ErrorMessage>
                            )
                        }
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="number"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Numero
                        </label>
                        <input
                            {
                            ...register('number', {
                                required: 'El numero es obligatorio'
                            })
                            }
                            type="number"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="number"
                            placeholder="Ingrese el Numero"
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
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="email"
                            placeholder="Ingrese el Email"
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
                                required: 'El numero es obligatorio'
                            })
                            }
                            type="password"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="password"
                            placeholder="Ingrese el Numero"
                        />
                        {
                            errors.password && (
                                <ErrorMessage>
                                    {errors.password?.message}
                                </ErrorMessage>
                            )
                        }
                    </div>

                  <div className="flex gap-4 mt-4">
                  <input
                        type="submit"
                        className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                        value="Crear Usuario"
                        onClick={() => toast.success("hola")}
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