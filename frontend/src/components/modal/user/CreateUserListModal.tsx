import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorLabel from "../../styles/ErrorLabel";
import { UserCreateForm, UserUpdateAdminForm } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "../../styles/LoadingSpinner";
import { createUserApi, getUserById, updateUserAdmin } from "../../../api/UserApi";
interface UserModalInterface {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CreateUserListModal({ open, setOpen }: UserModalInterface) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const queryParams = new URLSearchParams(location.search);
    const editUserParam = queryParams.get('editUser')!
    const isEditBoolean = editUserParam ? true : false

    const initialValues = {
        name: "",
        number:  "" ,
        password: "",
        email: "",
        instagram: ""
    }
    const { register, handleSubmit, reset, formState: { errors }} = useForm(
        { defaultValues: initialValues }
    )


        const { data, isError, isLoading: isLoadingUserEdit } = useQuery(
            {
            queryKey: ['getUserEdit', editUserParam],
            enabled: isEditBoolean,
            queryFn: () => getUserById(editUserParam),
            retry: false
        })
   useEffect(() => {
    if(data && isEditBoolean){
        const userFormData = {
            name: data.name || "",
            number: data.number || undefined,
            instagram: data.instagram || ""
        };
        reset(userFormData);
    }else{
        reset(initialValues)
    }
   }, [data, open])


  
    const { mutate: editUserMutate } = useMutation({
        mutationFn: updateUserAdmin,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setOpen(false)
            queryClient.invalidateQueries({queryKey: ['getUsers']})
            navigate(location.pathname, { replace: true })
            reset()
        }
    })
    const { mutate } = useMutation({
        mutationFn: createUserApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getUsers']})
            navigate(location.pathname, { replace: true })
            setOpen(false)
            reset()
        }
    })

    const handleCreate = async (formData: UserCreateForm) => {
        mutate(formData)
    }
    const handleEdit = async (form: UserUpdateAdminForm) => {
        const formData = {
            ...form,
            number: Number(form.number),
            _id: editUserParam
        }
        editUserMutate(formData)
    }
    if(isError) return <h1>falta implementar Error</h1>

    return (
        <div
            className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={() => {
                setOpen(false)
                navigate(location.pathname, {replace: true})
            }}
        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={isEditBoolean ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
                    className="bg-white w-[400px] shadow-md rounded-md p-7 mt-4 mx-2"
                >
                    {isLoadingUserEdit ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <h1 className="text-center text-xl font-bold text-gray-600 border-b border-gray-600 pb-3">{isEditBoolean ? "Editar Usuario" : "Crear Usuario"}</h1>
                    <div className="my-2">
                        <label htmlFor="name" className="uppercase text-gray-600 font-bold flex justify-between items-center ">
                            Nombre
                            {
                                errors.name && (
                                    <ErrorLabel>
                                        {errors.name?.message}
                                    </ErrorLabel>
                                )
                            }
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

                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="number"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Numero(Opcional)
                            {
                                errors.number && (
                                    <ErrorLabel>
                                        {errors.number?.message}
                                    </ErrorLabel>
                                )
                            }
                        </label>
                        <input
                            type="number"
                            {...register('number')}
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="number"
                            placeholder="Ingrese el Número"
                            
                        />

                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="instagram"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Instagram(Opcional)
                        </label>
                        <input
                            type="text"
                            {...register('instagram')}
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="instagram"
                            placeholder="Ingrese el Instagram"
                        />
                    </div>
                    {!isEditBoolean && (
                        <div className="my-2">
                            <label
                                htmlFor="email"
                                className="uppercase text-gray-600 flex justify-between items-center font-bold"
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
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                id="email"
                                placeholder="Ingrese el Email"
                            />

                        </div>
                    )}

                    {!isEditBoolean && (
                        <div className="my-2">
                        <label
                            htmlFor="password"
                            className="uppercase text-gray-600 flex justify-between items-center font-bold"
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
                                required: 'El password es obligatorio',
                            })
                            }
                            type="password"
                            className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                            id="password"
                            placeholder="Ingrese el Numero"
                        />

                    </div>
                    )}

                    <div className="flex gap-4 mt-4">
                     
                        <input
                            type="button"
                            value="Cancelar"
                            className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                            onClick={() => {
                                setOpen(false)
                                navigate(location.pathname, {replace: true})
                            }}
                        />
                           <input
                            type="submit"
                            className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                            value={isEditBoolean ? 'Editar Usuario' : 'Crear Usuario'}
                        />
                    </div>
                        </>
                    )}
                    
                </form>
            </div>
        </div>
    )
} 