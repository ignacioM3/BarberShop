import  { useState } from 'react'
import { ConfirmToken } from '../../types';
import {NewPasswordToken} from '../../components/auth/NewPasswordToken';
import { PageContainer } from '../../components/styles/PageContainer';
import { PageContent } from '../../components/styles/PageContent';
import { NewPasswordForm } from '../../components/auth/NewPasswordForm';



export function NewPassword() {
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState<ConfirmToken['token']>("")

  return (
    <PageContainer>
      <PageContent>
      <h1  className="text-center text-4xl font-black lg:text-2xl">Restablecer Password</h1>
        <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">
            Ingresa el código que recibiste {""}
            <span className="text-gray-500 font-bold">por email</span>
        </p>
        {
            !isValidToken ? 
            <NewPasswordToken token={token} setValidToken={setIsValidToken} setToken={setToken}/> : 
            <NewPasswordForm  token={token}/>
        }
      </PageContent>
    </PageContainer>
  )
}