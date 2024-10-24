import { useQuery } from "@tanstack/react-query";
import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { getBarberList } from "../../api/AuthApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { UserBarberListType } from "../../types";
import { MdBlock, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";
import { UserBarberModal } from "../../components/modal/UserBarberModal";

export function BarberList() {
  const navigate = useNavigate()
  const columns = ['Nombre', 'Número', 'Sucursal', "Activo"];
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0)
  const usersPerPage = 6;


  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBarbers', currentPage],
    queryFn: () => getBarberList(currentPage),
    retry: false
  })

  useEffect(() => {
    if (data) {
      setTotal(data.totalUsers)
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) return <h1>falta implementar error</h1>


  if (data) return (
    <PageContainer className="h-full">
      <PageHeader>
        <PageTitle>
          Barberos
        </PageTitle>
        <ListAddButton
          onClick={() => setOpen(true)}
        >
          Agregar Barbero
        </ListAddButton>
      </PageHeader>
      <PageContent>

      <div className="flex items-center justify-center">
                    <table className="w-full text-sm  text-left  rtl:text-right border border-gray-400 shadow-lg max-w-[1000px]">
                        <thead className="text-xs text-black uppercase border border-gray-400 text-center">
                            <tr>
                                {
                                    columns.map((col, index) => (
                                        <th key={index} scope="col" className="px-6 py-3">
                                            {col}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.totalUsers ? (
                                    data.users.map((row: UserBarberListType, rowIndex: number) => (
                                        <tr key={rowIndex} className="border border-gray-400 text-center">
                                            <td className="px-6 py-4">{row.name}</td>
                                            <td className="px-6 py-4">{row.role}</td>
                                            <td className="px-6 py-4">{row.confirmed ? 'si' : 'no'}</td>
                                            <td className="px-6 py-4">{row.confirmed ? 'si' : 'no'}</td>
                                            <td className="px-6 py-4 flex items-center gap-2 text-xl">
                                                <button className="border border-gray-700 p-2 rounded hover:bg-gray-400 hover:text-white hover:border-none transition-colors">
                                                    <MdOutlineEdit />
                                                </button>
                                                <button
                                                    className="border border-red-500 p-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors hover:border-none"
                                                    onClick={() => navigate(location.pathname + `?deleteProject=${row._id}`)}
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                                <button 
                                                     className="border border-blue-500 p-2 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors hover:border-none"
                                                >
                                                    <MdBlock />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : <tr><td colSpan={4} className="text-center p-3">No hay usuarios</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={total}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </PageContent>

      <UserBarberModal
      open={open}
      setOpen={setOpen}
      />
    </PageContainer>
  )
}
