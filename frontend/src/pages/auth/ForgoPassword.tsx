import { Link, Navigate } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { ForgotPasswordForm } from "../../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../../api/AuthApi";
import ErrorMessage from "../../components/styles/ErrorMessage";
import useAuth from "../../hooks/useAuth";


export function ForgoPassword() {
  const {currentUser} = useAuth();
    
  if(currentUser) return <Navigate to={AppRoutes.home.route()}/>
  const initialValues : ForgotPasswordForm = {
    email: ""
  }

  const {handleSubmit, register, reset, formState: {errors}} = useForm({
    defaultValues: initialValues
  });

  const {mutate} = useMutation({
    mutationFn: forgotPasswordApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);
  return (
    <div className="md:mt-[100px] mt-[100px]">
        <h1 className="text-4xl font-black text-center lg:text-2xl">Reestablecer password</h1>
        <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">
        ¿Olvdiaste tu password? coloca tu email {""}
        <span className="text-gray-500 font-bold"> y restablece tu password </span>
      </p>
      <form 
        onSubmit={handleSubmit(handleForgotPassword)}
        className=" p-10 max-w-[650px] mx-auto  bg-gray-100 mt-5 shadow-md rounded-sm  lg:max-w-[450px]"
      >
      <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-2  border-gray-300 border rounded-sm"
            {...register('email', {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          
          />
           {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-gray-600 hover:bg-gray-700 w-full p-2  text-white font-black  text-xl cursor-pointer mt-4 rounded-md"
        />
      </form>
      <nav
        className="mt-5 flex flex-col space-y-4"
      >
        <Link
        className="text-center text-gray-500 font-normal"
        to={AppRoutes.login.route()}
        >
            ¿Ya tienes cuenta? <span className="text-gray-500 font-bold">Iniciar Sesion</span>
        </Link>
        <Link
            to={AppRoutes.register.route()}
            className="text-center text-gray-500 font-normal"
            >
                   ¿No tienes cuenta? <span className="text-gray-500 font-bold">Registrate</span>
        </Link>
      </nav>
    </div>
  )
}
