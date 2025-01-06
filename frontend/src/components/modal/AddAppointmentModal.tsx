import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { TitleModal } from "./TitleModal";


interface AppointmentModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    
}

const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let hour = 9; hour <= 20; hour++) {
      const hourString = hour.toString().padStart(2, '0');
      times.push(`${hourString}:00`);
      if (hour !== 20) {
        times.push(`${hourString}:30`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();


export function AppointmentModal({ open, setOpen }: AppointmentModalProps) {
    const initialValues = {
        name: "",
        number: "",
        password_confirmation: "",
        password: "",
        email: ""
    }
    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm()

    return (
        <div
            className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={() => setOpen(false)}
        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-[350px]  md:w-[400px] shadow-md rounded-md px-7 py-4 mt-8 mx-4 md:mt-4"
                >
                    <TitleModal>Crear Turno - 11:30</TitleModal>
                    <div className="mt-2">
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
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Nombre"
                        />
                        
                    </div>
                    <div className="my-1">
                        <label
                            htmlFor="service"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Servicio
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
                            htmlFor="hour"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Hora
                        </label>
                        <select
                            {...register("hour", {
                                required: "Selecciona un servicio",
                            })}
                            id="hour"
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100 cursor-pointer"
                        >
                            <option value="">Selecciona un Servicio</option>
                            {
                                timeOptions.map((time, index) => ( 
                                    <option key={index} value={time}>{time}</option>
                                ))
                            }
                        </select>
                        
                    </div>
                    <div className="my-1">
                        <label
                            htmlFor="name"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Instagram (Opcional)
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
                            htmlFor="name"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Numero (opcional)
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
                            htmlFor="name"
                            className="uppercase text-gray-600 block font-bold"
                        >
                            Detalles
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
                            value="Crear Turno"
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}
