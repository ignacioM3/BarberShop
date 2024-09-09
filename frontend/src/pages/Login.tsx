import { Link } from "react-router-dom";


export default function Login() {
  return (
    <div className="my-5">
        <h1 className="text-center text-4xl font-black lg:text-2xl">Iniciar Sesión</h1>
        <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">
            Bienvenido a tu Barberia{" "}
            <span className="text-gray-500 font-bold">llenando el siguiente formulario</span>
        </p>
        <form action="">
            <div>
                <label htmlFor="">Email</label>
                <input 
                    type="email" 
                    placeholder="Email de Registro"
                />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    placeholder="Password"
                />
            </div>

            <input type="submit" 
                value="Iniciar Sesión"
            />
        </form>

        <nav
        className="mt-5 flex flex-col space-y-4"
      >
        <Link
          to=""
          className="text-center text-gray-500 font-normal"
        >
             ¿No tienes cuenta? Crea una
        </Link>
        <Link
          to=""
           className="text-center text-gray-500 font-normal"
        >
        ¿Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </div>
  )
}
