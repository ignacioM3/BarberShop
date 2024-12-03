
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { PropsWithChildren } from 'react';
import { Header } from '../components/Header';
import useAuth from '../hooks/useAuth';

export function AuthLayout({children}: PropsWithChildren) {
  const {currentUser} = useAuth()
  console.log(currentUser)


  return (
    <>
    <Header />
      <div className='mt-[100px] md:mt-[62px]'>
        {children}
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
