import { FaCalendarCheck } from "react-icons/fa";
import BlurText from "../components/bits/BlurText";
import ShinyText from "../components/bits/ShinyText";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes";
import useAuth from "../hooks/useAuth";
import { IoCutOutline } from "react-icons/io5";
import { GiRazor } from "react-icons/gi";
import { MdContentCut } from "react-icons/md";
import { LuPaintbrush } from "react-icons/lu";
import { toast } from "react-toastify";
import { TbMapSearch } from "react-icons/tb";
import { SiGooglemaps } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import { getAllBranchPublicApi } from "../api/PublicApi";
import LoadingSpinner from "../components/styles/LoadingSpinner";


export function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()

  const appointmentRoute = () => {
    if (!currentUser) {
      toast.info("Debes iniciar sessión para sacar turno")
      return
    }
    navigate(AppRoutes.selectBranchAppointment.route())
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBranchPublicApi,
    queryKey: ['getAllBranchsPublic']
  })

  if (isError) return <h1>falta implementar error</h1>

  return (
    <>
      {/* Mobile */}
      <div
        className="min-h-[80vh] bg-cover bg-center relative md:hidden"
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
            onClick={() => appointmentRoute()}
          >
            <FaCalendarCheck />
            <button
            >
              <ShinyText text="Reservar Turno" disabled={false} speed={3} />
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
            onClick={() => appointmentRoute()}
          >
            <FaCalendarCheck />
            <button>
              <ShinyText text="Reservar Turno" />
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


      <div className="mt-20 md:mt-10 mb-10">
        {/* Nuestros trabajos */}
        <div className="mt-4">
          <div className="flex flex-col items-center mb-10">
            <h2 className="font-bold uppercase text-white flex text-xl gap-1 p-3 items-center justify-center md:my-4">
              Nuestros Trabajos
            </h2>
            <div className="flex items-center">
              <div className="border w-[100px]"></div>
              <IoCutOutline className="mx-5 text-2xl" />
              <div className="border w-[100px]"></div>
            </div>

          </div>
          <div className="flex justify-center flex-col md:flex-row gap-10">

            <div className="relative flex justify-center ">

              <img src="img-1.jpeg" alt="" className="w-[250px] h-[250px] object-cover object-bottom shadow-2xl" />


              <button className="flex gap-2 w-[120px] shadow-2xl hover:bg-gray-100 transition-colors items-center justify-center bg-white p-2 absolute bottom-[-20px] left-1/2 translate-x-[-50%] text-[#a98729d4]">
                Cortes
                <MdContentCut className="text-xl " />
              </button>
            </div>

            <div className="relative flex justify-center ">

              <img src="img-2.jpeg" alt="" className="w-[250px] h-[250px] object-cover object-bottom shadow-2xl" />


              <button className="flex gap-2 w-[120px] shadow-2xl hover:bg-gray-100 transition-colors items-center justify-center bg-white p-2 absolute bottom-[-20px] left-1/2 translate-x-[-50%] text-[#a98729d4]">
                Claritos
                <GiRazor className="text-xl " />
              </button>
            </div>

            <div className="relative flex justify-center ">

              <img src="img-3.jpeg" alt="" className="w-[250px] h-[250px] object-cover object-bottom shadow-2xl" />


              <button className="flex gap-2 w-[120px] shadow-2xl hover:bg-gray-100 transition-colors items-center justify-center bg-white p-2 absolute bottom-[-20px] left-1/2 translate-x-[-50%] text-[#a98729d4]">
                Global
                <LuPaintbrush className="text-xl " />
              </button>
            </div>


          </div>
        </div>
      </div>
      <div className="mt-20 md:mt-10 mb-10">
        <div className="flex flex-col items-center mb-10">
          <h2 className="font-bold uppercase text-white flex text-xl gap-1 p-3 items-center justify-center md:my-4">
            Ubicación
          </h2>
          <div className="flex items-center mb-10">
            <div className="border w-[100px]"></div>
            <TbMapSearch className="mx-5 text-2xl" />
            <div className="border w-[100px]"></div>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex justify-center flex-col md:flex-row gap-10 items-center">
              <img
                src="maps.webp"
                alt=""
                className="w-[95%] md:w-full max-w-[450px] object-cover  shadow-xl rounded-md cursor-pointer mx-auto"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-center text-white font-bold text-xl border-b pb-2">
                  Nico Barberia
                </h1>
                <p className="text-center text-white font-bold">
                  Estamos ubicados en la calle {data[0].address}, Vicente Lopez.
                </p>
                <p className="text-center text-white font-bold">
                  Horario: Martes a Sábado de {data[0].open} a {data[0].close}
                </p>
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/MSSNFa1xZapzzeqQ8"
                  className="w-[200px] mt-2 mx-auto flex items-center gap-2 justify-center bg-gray-500 text-white p-2 rounded-md hover:bg-gray-400 transition-colors hover:text-gary-200"
                >
                  <SiGooglemaps />
                  Abrir Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
