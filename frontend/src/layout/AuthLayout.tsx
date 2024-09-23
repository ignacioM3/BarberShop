
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';

export function AuthLayout({children}: PropsWithChildren) {


  return (
    <>
    <Header />
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
