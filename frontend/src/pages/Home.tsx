import { Carrousel } from "../components/carrousel/Carrousel";
import { FaCalendarCheck } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

export function Home() {
  return (
    <>
      <Carrousel />
      <div >
        <div className="flex items-center justify-center ">
        <p className="p-2 uppercase text-center font-bold text-gray-500">Vení a cambiar tu estilo <br />  <span className="text-gray-700">Reserva Online</span>:</p>

        </div>
        <div className="flex items-center justify-center gap-2 bg-gray-400 w-fit p-4 rounded-md cursor-pointer mx-auto text-white font-bold shadow-md">
          <FaCalendarCheck />
          <button >  Reservar Turno</button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold flex gap-1 p-3 items-center">
          Nuestros Trabajos
          </h2>
      </div>
    </>
  )
}
