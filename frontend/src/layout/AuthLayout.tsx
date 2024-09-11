
import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PropsWithChildren } from 'react';

export function AuthLayout({children}: PropsWithChildren) {
  const { user } = useAuth();

  return (
    <>
      <header className='flex justify-between p-3 border-b-2 bg-white shadow-sm items-center fixed w-full z-[100] top-0'>
        <GiHamburgerMenu className='text-4xl cursor-pointer' />
        <img className='w-[70px]' src="/logo.jpg" alt="" />
        {
          user ?
            <div className='flex gap-2 items-center'>
              <FaUser className='text-3xl cursor-pointer' />
            </div> :
            <>
              <button
                className='p-2 bg-gray-700 rounded-md cursor-pointer text-white font-bold hidden'
              >Iniciar Sesion
              </button>
              <FaUser className='text-3xl cursor-pointer' />
            </>
        }
      </header>
      <div className='mt-[125px]'>
        {children}
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
