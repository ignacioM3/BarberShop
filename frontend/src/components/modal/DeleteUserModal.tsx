import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteUserApi } from '../../api/AuthApi';
import { toast } from 'react-toastify';

export default function DeleteUserModal() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!
    const show = deleteProjectId ? true : false;

    const {mutate} = useMutation({
        mutationFn: deleteUserApi,
        retry: false,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getUsers']})
            navigate(location.pathname, { replace: true })
        }
    })

    const handleSubmit = () => mutate(deleteProjectId)
  return (
    <div 
        className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0 `}
        onClick={() => navigate(location.pathname, { replace: true })}
        >
        <div className='w-full h-full flex items-center justify-center'>
            <form 
            className='bg-white w-[300px] text-center rounded-md shadow-sm p-5'
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            >
                <h2 className='text-xl font-bold'>¿Quiere eliminar a este usuario?</h2>
                <div className='flex gap-2 justify-center mt-4'>
                    <input 
                        type="submit" 
                        className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-red-800 transition-colors'
                        value="Eliminar"
                        />
                    <input 
                        type="button" 
                        value="Cancelar"
                        className='bg-green-400 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-green-700 transition-colors'
                        onClick={() => navigate(location.pathname, { replace: true })}
                    />
                </div>
            </form>
        </div>
    </div>
  )
}