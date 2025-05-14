
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import 'react-toastify/dist/ReactToastify.css'
import { FaHome } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AppRoutes } from '../routes';
import { UserRole } from '../types/use-role'
import { Burger } from './styles/Burger'
import { IoIosBusiness } from "react-icons/io";
import { useState } from 'react'
import { FaDollarSign } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";


export function Header() {
  const { currentUser, logoutUser } = useAuth()
  const navigate = useNavigate()

  const [clicked, setClicked] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const handleClick = () => setClicked(!clicked)
  const handlePerfil = () => {
    setClicked2(!clicked2)
  }

  return (
    <>
      <header className='flex h-[70px] md:h-auto justify-between p-3 lg:py-0 bg-[#ae9961dd] shadow-sm items-center fixed w-full z-[100] top-0 rounded-b-md'>
        <Burger clicked={clicked} handleClick={handleClick} className='burger-white' />
        <Link to={AppRoutes.home.route()}>
          <img className='w-[70px] h-[70px] lg:w-[80px] bg-cover' src="/logo.webp" alt="Logo Barberia" />
        </Link>
        <div className='hidden md:flex gap-5 flex-grow items-center justify-center '>
          <Link to={AppRoutes.home.route()} className='font-bold hover:bg-amber-200 p-3 rounded-md text-gray-600 transition-colors'>Inicio</Link>
          <Link to={AppRoutes.about.route()} className='font-bold hover:bg-amber-200 p-3 rounded-md text-gray-600 transition-colors'>Nosotros</Link>
          <Link to={AppRoutes.aboutBranch.route()} className='font-bold hover:bg-amber-200 p-3 rounded-md text-gray-600 transition-colors'>Sucursales</Link>
          <Link to={AppRoutes.price.route()} className='font-bold hover:bg-amber-200 p-3 rounded-md text-gray-600 transition-colors'>Precios</Link>
        </div>
        {
          currentUser ?
            <div className='flex gap-1 items-center justify-center cursor-pointer '>
              {
                (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.BARBER) && (
                  <Link to={AppRoutes.homeAdmin.route()} className='hidden md:block font-bold mr-3 py-2 px-3 text-green-100 shadow-md hover:bg-gray-400 transition-colors border rounded-md'>
                    Admin
                  </Link>
                )
              }
              <Link to={AppRoutes.home.route()} className='hidden md:block font-bold mr-3 py-2 px-3 text-green-100 shadow-md hover:bg-gray-400 transition-colors border rounded-md'>
                Turnos
              </Link>
              <div className='flex items-center' onClick={() => navigate(AppRoutes.profile.route())}>
                <FaUser className='text-3xl cursor-pointer mx-2 md:mx-0 hidden md:block' />
                <IoMdArrowDropdown className='hidden md:block' />
              </div>
              <FaUser className='text-3xl cursor-pointer md:hidden' onClick={handlePerfil} />
              <button
                className="items-center gap-2 p-3 h-full pr-4 rounded hover:bg-amber-200 transition-colors hidden md:flex"
                onClick={logoutUser}
              >
                Salir
                <IoIosLogOut />
              </button>
            </div>
            :
            <>
              <div className=' hidden md:flex gap-2 '>
                <Link to={AppRoutes.login.route()}
                  className='px-1 py-2 w-[100px] bg-gray-700 rounded-md cursor-pointer text-center text-white font-bold  text-[14px] hover:bg-gray-800 transition-colors'
                >Iniciar Sesión
                </Link>
                <Link to={AppRoutes.register.route()}
                  className='px-2 py-2 w-[100px] bg-gray-700 rounded-md cursor-pointer text-center text-white font-bold text-sm  hover:bg-gray-800 transition-colors'
                >Registrate
                </Link>
              </div>

              <FaUser className='text-3xl cursor-pointer md:hidden' onClick={handlePerfil} />

            </>
        }


      </header>
      <div className={`${clicked && "active"} bg flex flex-col md:hidden`}>
        <Link to={AppRoutes.home.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-100 font-bold'><FaHome />Inicio</Link>
        <Link to={AppRoutes.about.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-100 font-bold'><FaUserGroup />Nosotros</Link>
        <Link to={AppRoutes.aboutBranch.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-100 font-bold'><IoIosBusiness />Sucursales</Link>
        <Link to={AppRoutes.price.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-100 font-bold'><FaDollarSign />Precios</Link>


      </div>
      <div className={`${clicked2 && 'activePerfil'} bg bgWidth  flex flex-col md:hidden`}>
        {
          currentUser ? (
            <>
              {currentUser.role === UserRole.ADMIN && (
                <Link to={AppRoutes.homeAdmin.route()} className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-green-600 bg-green-300 font-bold'>Admin<FaUserGroup /></Link>
              )}
              <Link to={AppRoutes.profile.route()} className='flex items-center justify-end gap-2 p-2 text-gray-300 font-bold'>Perfil<FaRegUser className='font-bold' /></Link>
              <Link to={AppRoutes.profile.route()} className='flex items-center justify-end gap-2 p-2 text-gray-300 font-bold'>Turnos<CiCalendarDate className='font-bold' /></Link>
              <Link to={AppRoutes.home.route()} className='flex items-center justify-end gap-2 p-2 text-gray-300 font-bold'>Ajustes<FaCog className='font-bold' /></Link>
              <button onClick={logoutUser} className='flex items-center justify-end gap-2 p-2 text-gray-300 font-bold'>Cerrar Sesión<IoIosLogOut className='font-bold text-xl' /></button>
            </>
          ) : (
            <>
              <Link to={AppRoutes.register.route()} className='flex items-center justify-end gap-2 p-2 text-gray-300 font-bold'>Registrarse<FaRegUser className='font-bold' /></Link>
              <Link to={AppRoutes.login.route()} className='flex items-center justify-end gap-2 p-2 text-gray-300 font-bold'>Iniciar Sesión<RiLoginBoxLine className='font-bold text-xl' /></Link>
            </>
          )
        }
      </div>
    </>
  )
}
