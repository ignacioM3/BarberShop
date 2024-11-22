import { Carrousel } from "../components/carrousel/Carrousel";
import { FaCalendarCheck } from "react-icons/fa";

export function Home() {
  return (
    <>
      <Carrousel />
      <div >
        <div className="flex items-center justify-center ">
          <p className="p-2 uppercase text-center font-bold text-gray-500">Vení a cambiar tu estilo <br />  <span className="text-gray-700">Reserva Online</span>:</p>

        </div>
        <div className="flex items-center justify-center gap-2 bg-gray-400 w-fit p-4 rounded-md cursor-pointer mx-auto text-white font-bold shadow-md hover:bg-gray-600 transition-colors">
          <FaCalendarCheck />
          <button>  Reservar Turno</button>
        </div>
      </div>
      {/* Nuestros trabajos */}
      <div className="mt-4">
        <h2 className="font-bold flex text-xl gap-1 p-3 items-center justify-center md:my-4">
          Nuestros Trabajos
        </h2>
        <div className="flex justify-center">

          <div className="relative flex justify-center">

            <img src="corte1.jpeg" alt="" className="object-cover filter brightness-50 blur-[2px] w-[250px] mx-8 h-[250px]" />


            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-xl mb-4">Cortes de Pelo</h3>
                <button className="px-6 py-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition-colors ">
                  Ver Cortes
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center mt-6 md:mt-0">

            <img src="clarito1.jpeg" alt="" className="object-cover filter brightness-50 blur-[2px]  w-[250px] mx-8 h-[250px]" />


            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-xl mb-4">Claritos</h3>
                <button className="px-6 py-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition-colors ">
                  Ver Claritos
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center mt-6 md:mt-0">

            <img src="tintes1.jpeg" alt="" className="object-cover filter brightness-50 blur-[2px]  w-[250px] mx-8 h-[250px]" />


            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-xl mb-4">Tintes</h3>
                <button className="px-6 py-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition-colors ">
                  Ver Tintes
                </button>
              </div>
            </div>

          </div>
        </div>


      </div>
    {/* Productos */}
      <div className="my-6">
        <h2 className="font-bold flex text-xl gap-1 p-3 items-center">
          Productos
        </h2>
      </div>

    </>
  )
}
