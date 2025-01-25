import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom"
import { deleteBranchByIdApi } from "../../../api/BranchApi";
import { toast } from "react-toastify";


export function DeleteBranchModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const branchId = queryParams.get('deleteBranch')!
    const show = branchId ? true : false;
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn:  deleteBranchByIdApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(data)
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey: ['getBranchs']})
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(branchId)
    }
  return (
    <div 
        className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0 `}
        onClick={() => navigate(location.pathname, {replace: true})}
        >
        <div className='w-full h-full flex items-center justify-center'>
            <form 
            className='bg-white w-[300px] text-center rounded-md shadow-sm p-5'
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            >
                <h2 className='text-xl font-bold'>¿Quiere eliminar a esta barberia?</h2>
                <div className='flex gap-2 justify-center mt-4'>
                    <input 
                        type="button" 
                        className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-red-800 transition-colors'
                        value="Cancelar"
                        onClick={() => navigate(location.pathname, { replace: true })}
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
