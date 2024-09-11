import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/routes";


export default function Login() {
  return (
    <div className="my-5">
        <h1 className="text-center text-4xl font-black lg:text-2xl">Iniciar Sesión</h1>
        <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">
            Bienvenido a tu Barberia{" "}
            <span className="text-gray-500 font-bold">llenando el siguiente formulario</span>
        </p>
        <form 
          action=""
          className="p-10 max-w-[650px] md:mx-auto  bg-gray-100 mx-4 mt-5 shadow-md rounded-sm  lg:max-w-[450px]"
          >
            <div className="flex flex-col gap-5 lg:gap-3 mb-3">
                <label 
                htmlFor="email"
              className="font-normal text-2xl lg:text-xl"
                >Email</label>
                <input 
                    id="email"
                    type="email" 
                    className="w-full p-3 lg:p-2 lg:rounded-sm border-gray-300 border"
                    placeholder="Email de Registro"
                />
            </div>
            <div className="flex flex-col gap-5 lg:gap-3 mb-3">
                <label 
                 className="font-normal text-2xl lg:text-xl"
                  htmlFor="password"
                  >Password</label>
                <input
                    className="w-full p-3 lg:p-2 lg:rounded-sm border-gray-300 border"
                    id="password"
                    type="password" 
                    placeholder="Password"
                />
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
