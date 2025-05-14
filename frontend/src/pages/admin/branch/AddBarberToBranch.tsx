import { useParams } from 'react-router-dom'
import { PageContainer } from '../../../components/styles/PageContainer';
import { PageHeader } from '../../../components/styles/PageHeader';
import { PageTitle } from '../../../components/styles/PageTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBarberToBranch, getBarbersOutBranch, getBranchById, removeBarberToBranch } from '../../../api/BranchApi';
import LoadingSpinner from '../../../components/styles/LoadingSpinner';
import { PageContent } from '../../../components/styles/PageContent';
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { ListBarberInBranch} from '../../../types/index'
import { toast } from 'react-toastify';

export function AddBarberToBranch() {
  const { id } = useParams()
  const branchId = id!
  const queryClient = useQueryClient()


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getBranchById(branchId),
    queryKey: ['getBranchById', branchId],
    retry: false
  })
  const {mutate: removeBarber} = useMutation({
    mutationFn: removeBarberToBranch,
    retry: false,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {  
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['getBranchById', branchId]})
      queryClient.invalidateQueries({queryKey: ['getBarbersOutBranch']})
    }
  })

  const {mutate: addBarber} = useMutation({
    mutationFn: addBarberToBranch,
    retry: false,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {  
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['getBranchById', branchId]})
      queryClient.invalidateQueries({queryKey: ['getBarbersOutBranch']})
    }
  })

  const handleSubmit = (id: string) => removeBarber({barberId: id, branchId})
  const handleAddSubmit = (id: string) => addBarber({barberId: id, branchId})

  const { data: barbers, isLoading: isLoadingBarber } = useQuery({
    queryKey: ['getBarbersOutBranch'],
    queryFn: getBarbersOutBranch,
    retry: false
  })



  if (isLoading || isLoadingBarber) return <LoadingSpinner />
  if (isError) return <h1>falta implementar error</h1>

  if (data) return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Lista de Barberos - {data?.name}</PageTitle>

      </PageHeader>
      <PageContent>
        <div className='flex items-center justify-center flex-col'>

            <div className='w-full text-sm text-left rtl:text-right border border-gray-400 shadow-lg max-w-[400px]'>
              <p className='p-3 text-center font-bold text-xl'>Barberos Actuales</p>
            </div>

            <div className='flex flex-col items-center w-full max-w-[400px] py-3 border border-gray-400 mb-10'>
              {
                data.barbers.length ? 
                (
                  data.barbers.map((barber, i) => (
                    <div className='flex items-center justify-between w-full my-2 px-10' key={i}>
                        <span>{barber.name}</span>
                        <div 
                          className='border text-xl border-red-400 p-2 rounded-md cursor-pointer hover:bg-red-400  text-red-400 hover:text-white transition-colors'
                          onClick={() => handleSubmit(barber._id)}
                          >
                        <FaRegTrashCan  />
                        </div>
                    </div>
                      
                  ))
                ) : 
                <p>No hay barberos en esta sucursal</p>
              }
            </div>

            <div className='w-full text-sm text-left rtl:text-right border border-gray-400 shadow-lg max-w-[400px]'>
              <p className='p-3 text-center font-bold text-xl'>Barberos Disponibles</p>
            </div>

            <div className='flex flex-col items-center w-full max-w-[400px] py-3 border border-gray-400'>
              {
              barbers.length ? 
              barbers.map((barber: ListBarberInBranch )=> (
                <div className='flex items-center justify-between w-full my-2 px-10' key={barber._id}>
                    <span>{barber.name}</span>
                    <div 
                    className='border text-xl border-green-400 p-2 rounded-md cursor-pointer hover:bg-green-400  text-green-400 hover:text-white transition-colors '
                    onClick={() =>handleAddSubmit(barber._id)}

                    >
                         <IoMdPersonAdd />
                    </div>
                </div>
                  
              )) : 
              <p>No hay barberos disponibles</p>
              }
            </div>


        </div>
      </PageContent>
    </PageContainer>
  )
}
