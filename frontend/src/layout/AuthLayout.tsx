
import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function AuthLayout() {
  const { user } = useAuth();

  return (
    <div>
      <header className='flex justify-between p-3 border-b-2 bg-white shadow-sm items-center fixed w-full z-[100] top-0'>
        <GiHamburgerMenu className='text-4xl cursor-pointer' />
        {
          user ?
            <div className='flex gap-2 items-center'>
              <FaUser className='text-3xl cursor-pointer' />
            </div> :
            <button
              className='p-2 bg-gray-700 rounded-md cursor-pointer text-white font-bold'
            >Iniciar Sesion</button>
        }
      </header>
      <div className='mt-[75px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout