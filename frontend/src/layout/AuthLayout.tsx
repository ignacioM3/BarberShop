
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';
import useAuth from '../hooks/useAuth';
import { Footer } from '../components/Footer';

export function AuthLayout({children}: PropsWithChildren) {
  const {currentUser} = useAuth()
  console.log(currentUser)


  return (
    <div className="min-h-screen bg-cover flex flex-col bg-[#ae9961dd]" >
    <Header />
      <div className='mt-[70px] md:mt-[0px]'>
        {children}
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <Footer />
    </div>
  )
}
