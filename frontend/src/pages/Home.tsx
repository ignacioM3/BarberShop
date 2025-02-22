import { FaCalendarCheck } from "react-icons/fa";
import BlurText from "../components/bits/BlurText";
import ShinyText from "../components/bits/ShinyText";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile */}
      <div
        className="min-h-screen bg-cover bg-center relative md:hidden"
        style={{ backgroundImage: "url('/1.jpg')" }}
      >
        {/* Título */}
        <div className="bg-[#a98729b5] text-center rounded-md py-14 w-[300px] absolute top-[150px] left-1/2 transform -translate-x-1/2">
          <BlurText 
          text="Veni cambia tu estulo con nostros"
          delay={125}
          animateBy="words"
          direction="top"
        className="text-4xl font-india text-white font-bold uppercase"
          />

        </div>

        {/* Div en el medio de la parte inferior */}
        <div
          className="flex items-center justify-center flex-col gap-3 bg-[#a98729d4] w-[300px] p-5 rounded-md absolute bottom-[-60px] left-1/2 transform -translate-x-1/2"
        >
          <h1 className="text-center text-2xl font-bold text-gray-300">
            Turno Online:
          </h1>
          <div 
            className="flex items-center justify-center gap-2 bg-gray-400 w-fit p-4 rounded-md cursor-pointer mx-auto text-white font-bold shadow-md hover:bg-gray-600 transition-colors"
            onClick={() => navigate(AppRoutes.selectBranchAppointment.route())}
            >
            <FaCalendarCheck />
            <button
            >
              <ShinyText text="Reservar Turno" disabled={false} speed={3}/>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="min-h-screen bg-cover bg-center relative hidden md:flex items-center justify-around relavitve "
        style={{
          backgroundImage: "url('/bg-desktop.webp')",
          maskImage:
            "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9) 90%, rgba(255, 255, 255, 0))", // Aplica una máscara de gradiente
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9) 90%, rgba(255, 255, 255, 0))",

        }}
      >
        <div className="flex items-center justify-center flex-col gap-3 bg-[#a98729d4] w-[300px] p-5 rounded-md bottom-[10px]">
          <h1 className="text-center text-2xl font-bold text-gray-300">
            Turno Online:
          </h1>
          <div 
            className="flex items-center justify-center gap-2 bg-gray-400 w-fit p-4 rounded-md cursor-pointer mx-auto text-white font-bold shadow-md hover:bg-gray-600 transition-colors"
            onClick={() => navigate(AppRoutes.selectBranchAppointment.route())}
            >
            <FaCalendarCheck />
            <button>
            <ShinyText text="Reservar Turno"/>
            </button>
          </div>
        </div>
        <div className="bg-[#a98729b5] text-center rounded-lg py-14 w-[300px] ">
          <BlurText 
          text="Veni cambia tu estulo con nostros"
          delay={125}
          animateBy="words"
          direction="top"
        className="text-4xl font-india text-white font-bold uppercase"
          />
        </div>


      </div>


      {/* Contenido */}


      <div className="mt-20 mb-10">
        {/* Nuestros trabajos */}
        <div className="mt-4">
          <h2 className="font-bold uppercase text-gray-300 flex text-xl gap-1 p-3 items-center justify-center md:my-4">
            Nuestros Trabajos
          </h2>
          <div className="flex justify-center flex-col md:flex-row">

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
      </div>
    </>
  )
}
