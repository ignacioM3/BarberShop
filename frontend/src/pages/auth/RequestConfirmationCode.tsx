import { Link } from "react-router-dom";


export function RequestConfirmationCode() {
  return (
    <div>
        <h1>Solicita Codigo de Confirmación</h1>
        <p>Coloca tu email para recibir {' '}
            <span>un nuevo código</span>
        </p>
        <form action="">
            <div>
                <label 
                    htmlFor="email"
                    >
                    email
                </label>
                <input type="email"  id="email" placeholder="Email de Registro"/>
            </div>
            <input type="submit" value="Enviar Código" />
        </form>
        <nav className="">
            <Link
                to=""
                >
                ¿Ya tienes una cuenta? Iniciar Sesión
            </Link>
            <Link
                to=""
                >
            
            </Link>
        </nav>
    </div>
  )
}

