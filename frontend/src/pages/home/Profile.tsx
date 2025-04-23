import useAuth from "../../hooks/useAuth"
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfile from "../../components/modal/profile/EditProfile";

export function Profile() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <div className="mt-[25px] md:mt-[100px]">
        <h2 className="font-mono text-center text-2xl font-bold">Perfil</h2>
        <p className="text-center capitalize flex items-center justify-center gap-2">
            {currentUser?.name}
            <BsFillPersonCheckFill className="text-xl"/>
        </p>
      <div className="flex flex-col items-center mt-4">
      <div className="flex flex-col items-start  mt-4">
            <span className="font-bold">Email: <span className="font-normal font-mono">{currentUser?.email}</span></span>
            <span className="font-bold">Mi dirreción: <span className="font-normal font-mono">{currentUser?.address ? currentUser.address : " --- "}</span></span>
            <span className="font-bold">Cantidad de Cortes: <span className="font-normal font-mono">{currentUser?.haircuts}</span></span>
            <h3 className="text-center font-semibold my-2 w-full">Contacto</h3>
            <span className="font-bold">Whatsapp: <span className="font-normal font-mono"> {currentUser?.number ? currentUser.number : " --- "}</span></span>
            <span className="font-bold">Instagram: <span className="font-normal font-mono">{currentUser?.instagram ? currentUser.instagram : " --- "}</span></span>
            <button 
            className="flex items-center justify-center gap-2 bg-gray-500 p-2 rounded-md text-white font-mono font-bold mt-2 cursor-pointer w-full"
            onClick={() => navigate(location.pathname + `?editUser=true`)}
            >Editar <FiEdit /></button>
        </div>
      </div>

      <EditProfile />
    </div>
  )
}
