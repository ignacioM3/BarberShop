import { useQuery } from "@tanstack/react-query";
import { ListAddButton } from "../../../components/styles/LinkButton";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { UserBarberListType } from "../../../types";
import { MdBlock, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/styles/Pagination";
import DeleteUserModal from "../../../components/modal/user/DeleteUserModal";
import { BlockUserModal } from "../../../components/modal/user/BlockUserModal";
import { AppRoutes } from "../../../routes";
import { getBarberList } from "../../../api/BarberApi";

export function BarberList() {
  const navigate = useNavigate()
  const location = useLocation();

  const columns = ['Nombre', 'Número', 'Sucursal', "Activo"];
  const columnsMobile = ['Nombre', 'Sucursa']
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
          onClick={() => navigate(AppRoutes.createBarberAdmin.route())}
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
                    <th key={index} scope="col" className="px-6 py-3 hidden md:table-cell">
                      {col}
                    </th>
                  ))
                }
                {
                  columnsMobile.map((col, index) => (
                    <th key={index} scope="col" className="px-5 py-2 md:hidden">
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
                      <td className="px-6 py-4 hidden md:table-cell">{row.number ? row.number : "-"}</td>
                      <td className="px-6 py-4">{row.branch ? row.branch.name : 'No asignado'}</td>
                      <td className="px-6 py-4 hidden md:table-cell">{row.confirmed ? 'si' : 'no'}</td>
                      <td className="px-6 py-4 flex items-center gap-2 text-xl">
                        <button
                          className="border border-gray-700 p-2 rounded hover:bg-gray-400 hover:text-white hover:border-none transition-colors"
                          onClick={() => navigate(AppRoutes.editBarberAdmin.route(row._id))}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="border border-red-500 p-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors hover:border-none"
                          onClick={() => navigate(location.pathname + `?deleteUser=${row._id}`)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                        <button
                          className={`border border-blue-500 ${row.blocked ? "bg-blue-500 text-white" : ""} p-2 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors `}
                          onClick={() => navigate(location.pathname + `?blockUserId=${row._id}&${row.blocked && "block=true"}`)}
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
      <DeleteUserModal />
      <BlockUserModal />
    </PageContainer>
  )
}
