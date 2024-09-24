
import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import 'react-toastify/dist/ReactToastify.css'

import { AppRoutes } from '../routes';


export function Header() {
  const { currentUser } = useAuth()
  return (
    <header className='flex justify-between p-3 lg:py-0 border-b-2 bg-white shadow-sm items-center fixed w-full z-[100] top-0 rounded-b-md'>
      <GiHamburgerMenu className='text-4xl cursor-pointer md:hidden' />
      <Link to={AppRoutes.home.route()}>
        <img className='w-[70px] lg:w-[80px]' src="/logo.jpg" alt="" />
      </Link>
      <div className='hidden md:flex gap-5 flex-grow items-center justify-center'>
        <Link to={AppRoutes.home.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-black'>Inicio</Link>
        <Link to={AppRoutes.login.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-black'>Nosotros</Link>
        <Link to={AppRoutes.login.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-black'>Sucursales</Link>
        <Link to={AppRoutes.login.route()} className='font-bold hover:bg-gray-500 p-3 rounded-md text-gray-600 hover:text-black'>Precios</Link>
      </div>
      {
        currentUser ?
          <div className='flex gap-1 items-center justify-center cursor-pointer'>
            <span className='font-bold uppercase'>{currentUser.name}</span>
            <FaUser className='text-2xl cursor-pointer' />
          </div>
          :
          <>
            <div className=' hidden md:flex gap-2 '>
            <Link to={AppRoutes.login.route()}
              className='px-1 py-2 w-[100px] bg-gray-700 rounded-md cursor-pointer text-center text-white font-bold  text-[14px]'
            >Iniciar Sesión
            </Link>
            <Link to={AppRoutes.register.route()}
              className='px-2 py-2 w-[100px] bg-gray-700 rounded-md cursor-pointer text-center text-white font-bold text-sm'
            >Registrate
            </Link>
          </div>
          
          </>
      }


    </header>
  )
}
