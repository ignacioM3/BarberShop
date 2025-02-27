import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageTitle } from "../../components/styles/PageTitle";
import { TbBrandCashapp } from "react-icons/tb";
import { BiErrorAlt } from "react-icons/bi";
import useAppointment from "../../hooks/useAppointment";

export function ResumenAppointment() {
    const navigate = useNavigate();
    const {appointment, branch} = useAppointment()
    const handleNext = () => {
        
    }

    console.log(appointment)
    return (
        <PageContainer>
            <PageContent className="md:mt-10">
                <PageTitle className="text-white font-bold">
                    Resumen del turno
                </PageTitle>
                <p className="text-center text-white  font-bold mt-6 uppercase ">Chequear la información del turno</p>
                <div className="bg-white rounded-md py-3 px-8 shadow-md mt-4 max-w-[400px] mx-auto w-full ">
                    <h3 className="text-center text-gray-500 font-bold text-xl mb-3">
                        Turno
                    </h3>
                    <hr className="mb-3"/>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Local:</span>
                        <span className="text-gray-700">{branch?.name}</span>
                    </div>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Horario:</span>
                        <span className="text-gray-700">{appointment.time}</span>
                    </div>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Dia:</span>
                        <span className="text-gray-700">{appointment.day}</span>
                    </div>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Dirreción:</span>
                        <span className="text-gray-700">{branch?.address}</span>
                    </div>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Barbero:</span>
                        <span className="text-gray-700">{appointment.barberName}</span>
                    </div>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Servicio:</span>
                        <span className="text-gray-700">{appointment.service}</span>
                    </div>
                    <div className="flex gap-2 mb-2 justify-between">
                        <span className="font-bold text-gray-500">Precio:</span>
                        <span className="text-gray-700">${appointment.price}</span>
                    </div>
                   
                </div>
                <div className="flex flex-col items-center justify-center mt-4 gap-4">
                        <button
                            className="bg-green-500 p-2 w-full max-w-[400px]  rounded-md cursor-pointer text-white font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                            onClick={() => handleNext()}
                        >
                            <TbBrandCashapp className="font-bold text-2xl" />
                            Pagar
                        </button>
                        <button
                            className="bg-red-500 p-2 w-full max-w-[400px] rounded-md cursor-pointer text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            <BiErrorAlt className="font-bold text-2xl" />
                            Volver
                        </button>
                    </div>
            </PageContent>
        </PageContainer>
    );
}
