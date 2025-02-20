import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { blockUserById } from "../../../api/UserApi";

export function BlockUserModal() {
    const location = useLocation();
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const queryParams = new URLSearchParams(location.search);
    const blockUserId = queryParams.get('blockUserId')!
    const msg = queryParams.get('block')
    const show = blockUserId ? true : false;

    const {mutate} = useMutation({
        mutationFn: blockUserById,
        retry: false,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getUsers']})
            navigate(location.pathname, {replace: true})
        }
    })
    const handleSubmit = () => mutate(blockUserId)


  return (
    <div
        className={`${show? 'fixed': 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
        onClick={() => navigate(location.pathname, {replace: true})}
    >
        <div className="w-full h-full flex items-center justify-center">

        <form
            className="bg-white text-center rounded-md shadow-sm p-5"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
        >
            <h2 className='text-xl font-bold'>¿Quiere {msg ? "desbloquear" : "bloquear"} a este usuario?</h2>
            <div className='flex gap-2 justify-center mt-4'>
                    <input 
                        type="button"
                        className={` bg-red-500 hover:bg-red-800 cursor-pointer text-white px-4 py-2 rounded-sm  transition-colors`}
                        value="Cancelar"
                        onClick={() => navigate(location.pathname, { replace: true })}
                        />
                    <input 
                        type="submit" 
                        value={`${msg ? "Desbloquear" : "Bloquear"}`}
                        className={`bg-green-500 hover:bg-green-700  cursor-pointer text-white px-4 py-2 rounded-sm  transition-colors`}
                    />
                </div>
        </form>
        </div>
    
    </div>
  )
}
