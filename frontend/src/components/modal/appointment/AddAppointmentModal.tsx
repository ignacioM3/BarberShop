import { useForm } from "react-hook-form";
import { TitleModal } from "../TitleModal";
import { toast } from "react-toastify";
import ErrorLabel from "../../styles/ErrorLabel";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointmentApi } from "../../../api/AppointmentApi";
import { createAppointmentForm } from "../../../types";
import { AppointmentStatus } from "../../../types/appointment-status";
import { getFormattedDates } from "../../../utils/getFormatDay";


export interface Services {
    service?: string;
    price?: number
}

interface SelectServiceProps {
    services?: Services[]
}


export function AppointmentModal({ services }: SelectServiceProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const time = queryParams.get('time')!
    const show = time ? true : false
    const { id } = useParams()

    const day = queryParams.get("appointmentWeek");
    const barberId = queryParams.get('barberId')!
    const branchId = id!
    const queryClient = useQueryClient();

    const { formatForApi } = getFormattedDates(day);

    const closeDetails = () => {
        queryParams.delete("time");
        reset()
        if (!day) {
            navigate(location.pathname, { replace: true });
        } else {
            navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
        }
    };


    const initialValues = {
        name: "",
        service: "",
        whatsapp: "",
        instagram: "",
        details: "",
        price: 0

    }

    const { mutate } = useMutation({
        mutationFn: createAppointmentApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
            closeDetails()
            queryClient.invalidateQueries({ queryKey: ["getTodayAppointment", branchId] })
            if (day) {
                queryClient.invalidateQueries({ queryKey: ["getAppointmentDayWeek", day] })
            }
            reset()
        }
    })

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: initialValues
    })
    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedService = e.target.value;

        const selectedServiceObj = services?.find(service => service.service === selectedService);
      
        setValue('service', selectedServiceObj?.service ?? "");
        setValue('price', selectedServiceObj?.price ?? 0);
      };
    const handleCreateAppointment = (formData: createAppointmentForm) => {

        const data = {
            ...formData,
            branchId: branchId,
            day: day ? formatForApi : new Date().toISOString().split('T')[0],
            timeSlot: time,
            barberId,
            manual: true,
            status: AppointmentStatus.BOOKED,
        }
        mutate({ branchId: branchId, formData: data })
    }

    return (
        <div
            className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={closeDetails}
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
                            onChange={handleServiceChange}
                            id="service"

                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100 cursor-pointer"
                        >
                            <option value="">Selecciona un Servicio</option>
                            {

                                services?.map((ser, index) => (
                                    <option value={ser.service} key={index} className="uppercase">{ser.service}</option>
                                ))
                            }
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
                            onClick={closeDetails}
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
