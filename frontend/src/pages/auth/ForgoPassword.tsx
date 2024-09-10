import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes/routes";


export function ForgoPassword() {
  return (
    <div>
        <h1>Reestablecer password</h1>
        <p >
        ¿Olvdiaste tu password? coloca tu email {""}
        <span> y restablece tu password </span>
      </p>
      <form action="">
        <div>
            <label htmlFor="">
                email
            </label>
            <input type="email" placeholder="Email de registro" />
        </div>
        <input 
            type="submit"
            value="Enviar Instrucciones"
            />
      </form>
      <nav>
        <Link
        to={AppRoutes.login.route()}
        >
            ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
            to={AppRoutes.register.route()}
            >
                   ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </div>
  )
}
