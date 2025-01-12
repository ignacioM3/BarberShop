import { useForm } from "react-hook-form";
import { TitleModal } from "./TitleModal";
import { toast } from "react-toastify";
import ErrorLabel from "../styles/ErrorLabel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointmentApi } from "../../api/AppointmentApi";
import { createAppointmentForm } from "../../types";
import { AppointmentStatus } from "../../types/appointment-status";




export function AppointmentModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const time = queryParams.get('time')!
    const show = time ? true : false
    const {id} = useParams()
    const branchId = id!
    const queryClient = useQueryClient();

     const initialValues = {
        name: "",
        service: "",
        whatsapp: "",
        instagram: "",
        details: ""

    }

    const {mutate} = useMutation({
        mutationFn: createAppointmentApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({queryKey: ["getTodayAppointment", branchId]})
            reset()
        }
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: initialValues
    })

    const handleCreateAppointment = (formData: createAppointmentForm) => {
        
        const data = {
            ...formData,
            branchId: branchId,
            day: new Date().toISOString().split('T')[0],
            timeSlot: time,
            price: 7000,
            manual: true,
            status: AppointmentStatus.BOOKED,
        }
        mutate({branchId: branchId, formData: data})
    }

    return (
        <div
            className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={() => navigate(location.pathname, { replace: true })}
        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit(handleCreateAppointment)}
                    className="bg-white w-[350px]  md:w-[400px] shadow-md rounded-md px-7 py-4 mt-8 mx-4 md:mt-4"
                >
                    <TitleModal>Crear Turno - {time}</TitleModal>
                    <div className="mt-2">
                        <label
                            htmlFor="name"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            nombre 
                            {
                                errors.name && (
                                    <ErrorLabel>
                                        {errors.name?.message}
                                    </ErrorLabel>
                                )
                            }
                        </label>
                        <input
                            {...register("name", {
                                required: "El nombre es obligatorio",
                            })}
                            type="text"
                            id="name"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Nombre"
                        />
                        
                    </div>
                    <div className="my-1">
                        <label
                            htmlFor="service"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Servicio{
                                errors.service?.message && (
                                    <ErrorLabel>
                                        {errors.service?.message}
                                    </ErrorLabel>
                                )
                            }
                        </label>
                        <select
                            {...register("service", {
                                required: "Selecciona un servicio",
                            })}
                            id="service"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100 cursor-pointer"
                        >
                            <option value="">Selecciona un Servicio</option>
                            <option value="corte">Corte</option>
                            <option value="afeitado">Claritos</option>
                            <option value="tinte">Global</option>
                        </select>
                        
                    </div>
                  
                    <div className="my-1">
                        <label
                            htmlFor="instagram"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Instagram (Opcional)
                        </label>
                        <input
                            type="text"
                            {...register("instagram")}
                            id="instagram"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el instagram"
                        />
                        
                    </div>
                    
                    <div className="my-1">
                        <label
                            htmlFor="whatsapp"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Numero (opcional)
                        </label>
                        <input
                            type="text"
                            {...register("whatsapp")}
                            id="whatsapp"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Nombre"
                        />
                        
                    </div>
                    <div className="my-1">
                        <label
                            htmlFor="details"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >
                            Detalles
                        </label>
                        <input
                            {...register("details")}
                            type="text"
                            id="name"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Nombre"
                        />
                        
                    </div>
                    <div className="flex gap-4 mt-4">

                        <input
                            type="button"
                            value="Cancelar"
                            className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                            onClick={() => navigate(location.pathname, { replace: true })}
                        />
                           <input
                            type="submit"
                            className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                            value="Crear Turno"
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}
