import { useLocation, useNavigate } from "react-router-dom"
import { TitleModal } from "../TitleModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById, updateUserAdmin } from "../../../api/AuthApi";
import LoadingSpinner from "../../styles/LoadingSpinner";
import { useForm } from "react-hook-form";
import ErrorLabel from "../../styles/ErrorLabel";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { UserUpdateAdminForm } from "../../../types";

export function EditBarberModal() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('editUser')!
    const show = userId ? true : false;
    const queryClient = useQueryClient();

    const initialValues = {
        name: "",
        instagram: "",
        number: ""
    }
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: initialValues 
    })

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getUserById(userId),
        queryKey: ['barberEdit', userId],
        retry: false,
    })

    const { mutate} = useMutation({
        mutationFn: updateUserAdmin,
        onError: (error) => {
            toast.error(error.message)
            queryClient.invalidateQueries({queryKey: ['getBarbers']});
            navigate(location.pathname, {replace: true})
            reset()
        },
        onSuccess: (data) =>{
            toast.success(data);

        }
    })
    useEffect(() => {
      if(data){
        reset({
            name: data.name || '',
            instagram: data.instagram || '',
            number: data.number || ''
        })
      }  
      
    }, [data, reset]);

    const handleEditBarber = async (form: UserUpdateAdminForm) =>{
        const formData = {
            ...form,
            number: Number(form.number),
            _id: userId
        }

        mutate(formData)
    }

    if(isLoading) return <LoadingSpinner />
    if (isError) return <h1>falta implementar error</h1>
    return (
        <div
            className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={() => navigate(location.pathname, { replace: true })}

        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit(handleEditBarber)}
                    className="bg-white max-w-[350px] md:w-[400px] shadow-md rounded-md px-7 py-4 mt-7 mx-4"
                >
                    {isLoading ? <LoadingSpinner /> : (
                        <>
                            <TitleModal>Editar Barbero</TitleModal>
                            <div className="mt-2">
                                <label
                                    htmlFor="name"
                                    className="uppercase text-gray-600 font-bold flex justify-between items-center"
                                >
                                    Nombre
                                    {
                                        errors.name && (
                                            <ErrorLabel>
                                                {errors.name.message}
                                            </ErrorLabel>
                                        )
                                    }
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {
                                        ...register('name',{
                                            required: 'El nombre es obligatorio'
                                        })
                                    }
                                    className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                                    placeholder="Ingresa el Nombre"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="number"
                                    className="uppercase text-gray-600 font-bold flex justify-between items-center"
                                >
                                    Numero
                                </label>
                                <input
                                    type="text"
                                    id="number"
                                    {...register("number")}
                                    className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                                    placeholder="Ingresa el Numero"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="instagram"
                                    className="uppercase text-gray-600 font-bold flex justify-between items-center"
                                >
                                    Instagram
                                </label>
                                <input
                                    type="text"
                                    id="instagram"
                                    {...register("instagram")}
                                    className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                                    placeholder="Ingresa el instagram"
                                />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <input
                                    type="button"
                                    value="Cancelar"
                                    onClick={() => navigate(location.pathname, { replace: true })}
                                    className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                                />
                                <input
                                    type="submit"
                                    className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                                    value="Editar Barbero"
                                />
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}
