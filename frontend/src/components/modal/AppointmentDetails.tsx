import { useLocation, useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


export function AppointmentDetails() {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const AppointmentHours = queryParams.get('detailsAppointment')!
  const show = AppointmentHours ? true : false

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(location.pathname, { replace: true });
      }
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, navigate, location.pathname]);
  
  return (
    <div
      className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
      onClick={() => navigate(location.pathname, { replace: true })}
    >
      <div className="w-full h-full flex items-center justify-center mt-5 md:mt-0">
        <form
          className="bg-white w-full mx-5 max-w-[300px] rounded-md shadow-sm p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-bold text-center mb-2">Detalles del turno</h2>
          <div className="flex flex-col">
            <p className="flex justify-between font-bold">Nombre <span className="font-normal">Nacho Marquez</span></p>
            <p className="flex justify-between font-bold">Hora <span className="font-normal">10:30</span></p>
            <p className="flex justify-between font-bold">Servicio <span className="font-normal">Corte</span></p>
            <p className="flex justify-between font-bold">Precio <span className="font-normal">$7000</span></p>
            <p className="flex justify-between font-bold">Whatsapp <span className="font-normal flex items-center gap-2"><FaWhatsapp className="text-green-500 cursor-pointer text-xl"/> 1136176969</span></p>
            <p className="flex justify-between font-bold">Instagram <span className="font-normal flex items-center gap-2"><FaInstagram className="text-[#E1306C] cursor-pointer text-xl"/> Ignacio359</span></p>
            <p className="flex justify-between font-bold">Turno <span className="font-normal">Online</span></p>

            <p className="text-center font-bold">Detalles</p>
            <p className="text-center">Necesita un corte de pelos mas claritos servicio completo</p>
            <div className="flex justify-center gap-2 mt-4">
              <div className="bg-red-500 p-2 rounded-md cursor-pointer text-white hover:bg-red-700 transition-colors">
                <MdDelete />
              </div>
              <div className="bg-blue-500 p-2 rounded-md cursor-pointer text-white hover:bg-blue-700 transition-colors">
                <FaRegEdit />
              </div>
              <div className="bg-green-500 p-2 rounded-md cursor-pointer text-white hover:bg-green-700 transition-colors">
                <FaCheckSquare />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
