import { useForm } from "react-hook-form";
import { TitleModal } from "./TitleModal";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ErrorLabel from "../styles/ErrorLabel";
import { useLocation, useNavigate } from "react-router-dom";




export function AppointmentModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const time = queryParams.get('time')!
    const show = time ? true : false

    const {currentUser} = useAuth()
     const initialValues = {
        name: "",
        service: "",
        number: "",
        instagram: "",
        details: ""

    }
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm({
        defaultValues: initialValues
    })

    const handleCreateAppointment = (formData: any) => {
        toast.success(formData.name)
        console.log(formData.name);
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
                            id="instagram"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el instagram"
                        />
                        
                    </div>
                    
                    <div className="my-1">
                        <label
                            htmlFor="number"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Numero (opcional)
                        </label>
                        <input
                            type="text"
                            id="number"
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
                            {
                                errors.details?.message && (
                                    <ErrorLabel>
                                        {errors.details?.message}
                                    </ErrorLabel>
                                )
                            }
                        </label>
                        <input
                            {...register("details", {
                                required: "El nombre es obligatorio",
                            })}
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
