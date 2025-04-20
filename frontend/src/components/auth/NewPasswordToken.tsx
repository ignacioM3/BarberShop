import { PinInput, PinInputField } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { AppRoutes } from "../../routes"
import { useMutation } from "@tanstack/react-query"
import { validateTokenApi } from "../../api/AuthApi"
import { toast } from "react-toastify"

type NewPasswordTokenProps = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setValidToken: React.Dispatch<React.SetStateAction<boolean>> 
}


export function NewPasswordToken({token, setToken, setValidToken}: NewPasswordTokenProps) {
    const {mutate} = useMutation({
        mutationFn: validateTokenApi,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data)
            setValidToken(true)
        }
    })
    const handleChange = (token: string) =>{
        setToken(token)
    }

    const handleComplete = (token: string) =>{
        mutate({token})
    }
  return (
    <>
        <form
          className="space-y-8 p-10 rounded-lg mt-10 shadow-md bg-gray-100 max-w-[650px] lg:max-w-[450px] mx-auto"
        >
            <label className="font-normal text-2xl text-center block mb-4">
                Código de 6 dígitos
            </label>
            <div className="flex justify-center gap-5">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                    <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                    <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                    <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                    <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                    <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
                </PinInput>
            </div>
        </form>
        <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={AppRoutes.forgotPassword.route()}
                    className="text-center text-gray-700 hover:text-gray-800 font-bold transition-colors"
                >
                    Solicitar un nuevo Código
                </Link>
        </nav>
    </>
  )
}
