import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TitleModal } from "../TitleModal";
import { createBranchApi } from "../../../api/BranchApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ErrorLabel from "../../styles/ErrorLabel";
import { useEffect } from "react";
import { formDataCreateBranch } from "../../../types";

interface createBranchProps{
    open: boolean;
    setOpen: (open: boolean) => void;
}

export  function CreateBranchModal({open, setOpen}: createBranchProps) {
    const queryClient = useQueryClient();
    const initialValues = {
        name: "",
        address: "",
        open: "",
        close: ""
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: initialValues
    })

    useEffect(() => {
        if(!open){
            reset(initialValues)
        }
    }, [open])

    const {mutate} = useMutation({
        mutationFn: createBranchApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            setOpen(false)
            queryClient.invalidateQueries({queryKey: ['getBranchs']})
            
        }
    })

    const handleSubmit2 = (data: formDataCreateBranch) => { 
        mutate(data)
    }

  return (
    <div
        className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
        onClick={() => setOpen(false)}
    >
        <div className="flex items-center justify-center w-full h-full">
            <form
            onSubmit={handleSubmit(handleSubmit2)}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[350px]  md:w-[400px] shadow-md rounded-md p-7 mt-8 md:mt-4"
            
            >
                <TitleModal>Crear Sucursal</TitleModal>
                <div className="my-2">
                    <label
                    className="uppercase text-gray-600 font-bold flex items-center justify-between"
                    htmlFor="name">
                        Nombre
                       {errors.name && (
                        <ErrorLabel>
                            {errors.name.message}
                        </ErrorLabel>
                       )}
                    </label>
                    <input 
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                        type="text" 
                        id="name"
                        className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                        placeholder="Ingresa el Nombre"
                        />
                </div>
                <div className="my-2">
                    <label
                     className="uppercase text-gray-600 font-bold flex items-center justify-between"
                    htmlFor="address">
                        Dirreción
                        {errors.address && (
                            <ErrorLabel>
                                {errors.address.message}
                            </ErrorLabel>
                        )}
                    </label>
                    <input 
                        type="text" 
                        {...register('address', {
                            required: "La dirreción es obligatoria"
                        })}
                        id="address"
                        className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                        placeholder="Ingresa la dirreción"
                        />
                </div>
                <div className="my-2">
                    <label
                     className="uppercase text-gray-600 font-bold flex items-center justify-between"
                    htmlFor="open">
                        Apertura
                        {errors.open && ( 
                           <ErrorLabel>
                            {errors.open.message}
                           </ErrorLabel>
                        )}
                    </label>
                    <input 
                        type="text" 
                        {...register('open', {
                            required: 'Apertura es obligatoria',
                            pattern: {
                                value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                                message: "Formato inválido (ej: 08:00)",
                              },
                        })}
                        id="open"
                        className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                         placeholder="Hora de apertura ej: 08:00"
                        />
                </div>
                <div className="my-2">
                    <label
                     className="uppercase text-gray-600 font-bold flex items-center justify-between"
                    htmlFor="close">
                        Cierre 
                        {errors.close && (
                            <ErrorLabel >
                                {errors.close.message}
                            </ErrorLabel>
                        )}
                    </label>
                    <input 
                        type="text" 
                        id="close"
                        {...register('close', {
                            required: "cierre obligatorio",
                            pattern: {
                                value: /^([01]\d|2[0-3]):([0-5]\d)$/,
                                message: "Formato inválido (ej: 19:00)",
                              },
                        })}
                        className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                        placeholder="Hora de cierre ej: 19:00"
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
                            value="Crear Sucursal"
                        />

                    </div>
            </form>
        </div>
    </div>
  )
}
