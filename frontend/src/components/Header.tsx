
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
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

export function Header() {
  const { currentUser, logoutUser } = useAuth()
  console.log(currentUser)

  const [clicked, setClicked] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const handleClick = () => setClicked(!clicked)
  const handlePerfil = () => {
    setClicked2(!clicked2)
  }

  return (
    <>  
      <header className='flex h-[70px] md:h-auto justify-between p-3 lg:py-0 border-b-2 bg-white shadow-sm items-center fixed w-full z-[100] top-0 rounded-b-md'>
        <Burger clicked={clicked} handleClick={handleClick} />
        <Link to={AppRoutes.home.route()}>
          <img className='w-[70px] h-[60px] lg:w-[80px]' src="/logo.jpg" alt="" />
        </Link>
        <div className='hidden md:flex gap-5 flex-grow items-center justify-center'>
          <Link to={AppRoutes.home.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-white transition-colors'>Inicio</Link>
          <Link to={AppRoutes.login.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-white transition-colors'>Nosotros</Link>
          <Link to={AppRoutes.login.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-white transition-colors'>Sucursales</Link>
          <Link to={AppRoutes.login.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-white transition-colors'>Precios</Link>
        </div>
        {
          currentUser ?
            <div className='flex gap-1 items-center justify-center cursor-pointer '>
              {
                (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.BARBER) && (
                  <Link to={AppRoutes.homeAdmin.route()} className='hidden md:block font-bold mr-3 bg-gray-500 py-2 px-3 text-white rounded-sm shadow-md hover:bg-gray-600 transition-colors'>
                    Admin
                  </Link>
                )
              }
              <span className='font-bold uppercase hidden md:block'>{currentUser.name}</span>
              <FaUser className='text-3xl cursor-pointer' onClick={handlePerfil} />
              <button
                        className="items-center gap-2 p-3 h-full pr-4 rounded hover:bg-gray-200 transition-colors hidden md:flex"
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

              <FaUser className='text-3xl cursor-pointer md:hidden' onClick={handlePerfil}/>

            </>
        }


      </header>
      <div className={`${clicked && "active"} bg flex flex-col md:hidden `}>
        <Link to={AppRoutes.home.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'><FaHome />Inicio</Link>
        <Link to={AppRoutes.login.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'><FaUserGroup />Nosotros</Link>
        <Link to={AppRoutes.login.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'><IoIosBusiness />Sucursales</Link>
        <Link to={AppRoutes.login.route()} className='flex items-center gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'><FaDollarSign />Precios</Link>
       

      </div>
      <div className={`${clicked2 && 'activePerfil'} bg bgWidth  flex flex-col md:hidden`}>
       {
        currentUser ? (
          <>
          {currentUser.role === UserRole.ADMIN && (
             <Link to={AppRoutes.homeAdmin.route()} className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-green-600 bg-green-300 font-bold'>Admin<FaUserGroup /></Link>
          )}
           <Link to={AppRoutes.home.route()} className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'>Perfil<FaRegUser className='font-bold'/></Link>
           <Link to={""} className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'>Configuracion<FaCog /></Link>
           <button onClick={logoutUser}  className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'>Cerrar Sesión<IoIosLogOut className='font-bold text-xl' /></button>
          </>
        ) : (
          <>
           <Link to={AppRoutes.register.route()} className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'>Registrarse<FaRegUser className='font-bold'/></Link>
           <Link to={AppRoutes.login.route()} className='flex items-center justify-end gap-2 p-2 hover:bg-gray-500 hover:text-white text-gray-600 hover:font-bold'>Iniciar Sesión<RiLoginBoxLine  className='font-bold text-xl' /></Link>
          </>
        )
       }
      </div>
    </>
  )
}
