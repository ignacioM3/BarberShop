
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';
import useAuth from '../hooks/useAuth';

export function AuthLayout({children}: PropsWithChildren) {
  const {currentUser} = useAuth()
  console.log(currentUser)


  return (
    <div className="min-h-screen bg-cover flex flex-col " style={{ backgroundImage: "url('/bg-smoke.svg')" }}>
    <Header />
      <div className='mt-[70px] md:mt-[0px]'>
        {children}
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  )
}
