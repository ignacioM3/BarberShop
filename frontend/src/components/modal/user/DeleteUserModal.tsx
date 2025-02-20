import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteUserApi } from '../../../api/UserApi';

export default function DeleteUserModal() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const queryParams = new URLSearchParams(location.search);
    const deleteUserId = queryParams.get('deleteUser')!
    const show = deleteUserId ? true : false;

    const { mutate } = useMutation({
        mutationFn: deleteUserApi,
        retry: false,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['getUsers'] })
            navigate(location.pathname, { replace: true })
        }
    })

    const handleSubmit = () => mutate(deleteUserId)
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
                            type='button'
                            className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-red-800 transition-colors'
                            onClick={() => navigate(location.pathname, { replace: true })}
                            value="Cancelar"
                        />
                        <input
                            type="submit"
                            value="Eliminar"
                            className='bg-green-400 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-green-700 transition-colors'

                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
