import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../../api/AuthApi";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/styles/ErrorMessage";
import useAuth from "../../hooks/useAuth";



export default function Login() {
  const navigate = useNavigate();
  const {setCurrentUser, currentUser} = useAuth()
  const initialValues: UserLoginForm = {
    email: '',
    password: ''
  }
  

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: (formData: UserLoginForm) => authLogin(formData, setCurrentUser),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate(AppRoutes.home.route())
    }
  })

  const handleLogin = (FormData: UserLoginForm) => mutate(FormData);

  if(currentUser){
    return <Navigate to={AppRoutes.home.route()}/>
  }
  return (
    <div className="my-5 mt-[100px] ">
      <h1 className="text-center text-4xl font-black ">Iniciar Sesión</h1>
      <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">
        Bienvenido a tu Barberia{" "}
        <span className="text-gray-500 font-bold">llenando el siguiente formulario</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-10 max-w-[650px] md:mx-auto  bg-gray-100 mx-4 mt-5 shadow-md rounded-sm  lg:max-w-[450px]"
      >
        <div className="flex flex-col gap-5 lg:gap-3 mb-3">
          <label
            htmlFor="email"
            className="font-normal text-2xl lg:text-xl"
          >Email</label>
          <input
            {
            ...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no válido"
              }
            })
            }
            id="email"
            type="email"
            className="w-full p-3 lg:p-2 lg:rounded-sm border-gray-300 border"
            placeholder="Email de Registro"
          />
          {
            errors.email && (
              <ErrorMessage>
                {errors.email?.message}
              </ErrorMessage>
            )
          }
        </div>
        <div className="flex flex-col gap-5 lg:gap-3 mb-3">
          <label
            className="font-normal text-2xl lg:text-xl"
            htmlFor="password"
          >Password</label>
          <input
            {...register('password',{
              required: "Password es obligatorio"
            })}
            className="w-full p-3 lg:p-2 lg:rounded-sm border-gray-300 border"
            id="password"
            type="password"
            placeholder="Password"
          />
          {
            errors.password && (
              <ErrorMessage>
                {errors.password.message}
              </ErrorMessage>
            )
          }
        </div>

        <input type="submit"
          value="Iniciar Sesión"
          className="bg-gray-600 rounded-md hover:bg-gray-700 w-full p-3  text-white font-black  text-xl cursor-pointer mt-8"
        />
      </form>

      <nav
        className="mt-5 flex flex-col space-y-4"
      >
        <Link
          to={AppRoutes.register.route()}
          className="text-center text-gray-500 font-normal"
        >
          ¿No tienes cuenta? <span className="text-gray-500 font-bold">Crea una</span>
        </Link>
        <Link
          to={AppRoutes.forgotPassword.route()}
          className="text-center text-gray-500 font-normal"
        >
          ¿Olvidaste tu contraseña? <span className="text-gray-500 font-bold">Restablecer</span>
        </Link>
      </nav>
    </div>
  )
}
