import { useEffect, useState } from "react";
import { ListAddButton } from "../../../components/styles/LinkButton";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { UserListType } from "../../../types";
import DeleteUserModal from "../../../components/modal/user/DeleteUserModal";
import { useLocation, useNavigate } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import { Pagination } from "../../../components/styles/Pagination";
import { BlockUserModal } from "../../../components/modal/user/BlockUserModal";
import { getUserList } from "../../../api/UserApi";
import { AppRoutes } from "../../../routes";


export function UserList() {
    const columns = ['Nombre', 'Instagram', 'Número','Confirmado', 'Cortes'];
    const columnsMobile = ['Nombre', 'Confirmado']
    const [currentPage, setCurrentPage] = useState<number>(1);
    const userPerPage = 6;
    const [total, setTotal] = useState<number>(0)

    const navigate = useNavigate();
    const location = useLocation()


    const { data, isLoading, isError } = useQuery({
        queryKey: ['getUsers', currentPage],
        queryFn: () => getUserList(currentPage),
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



    if (isError) return <h1>Falta Implementar error</h1>
    if (data) return (
        
        
        <PageContainer className="h-full">
            <PageHeader>
                <PageTitle>
                    Usuarios
                </PageTitle>
                <ListAddButton
                   onClick={() => navigate(AppRoutes.createUserAdmin.route())}
                >
                    Agregar Usuario
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
                                        <th key={index} scope="col" className="px-6 py-3 md:hidden">
                                            {col}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.totalUsers ? (
                                    data.users.map((row: UserListType, rowIndex: number) => (
                                        <tr key={rowIndex} className="border border-gray-400 text-center">
                                            <td className="md:px-6 py-4">{row.name}</td>
                                            <td className="px-6 py-4 hidden md:table-cell">{row.instagram ? row.instagram : "- - -"}</td>
                                            <td className="px-6 py-4 hidden md:table-cell">{row.number ? row.number : "- - -"}</td>
                                            <td className="md:px-6 py-4">{row.confirmed ? 'si' : 'no'}</td>
                                            <td className="px-6 py-4 hidden md:table-cell">{row.haircuts}</td>
                                            <td className="px-6 py-4 flex items-center gap-2 text-xl">
                                                <button 
                                                    className="border border-gray-700 p-1 md:p-2 rounded hover:bg-gray-400 hover:text-white hover:border-gray-400 transition-colors"
                                                    onClick={() => navigate(AppRoutes.editUSerAdming.route(row._id))}
                                                    >
                                                    <MdOutlineEdit />
                                                </button>
                                                <button
                                                    className="border border-red-500 p-1 md:p-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors "
                                                    onClick={() => navigate(location.pathname + `?deleteUser=${row._id}`)}
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                                <button 
                                                     onClick={() => navigate(location.pathname + `?blockUserId=${row._id}&${row.blocked && "block=true"}`)}
                                                     className={`border border-blue-500 ${row.blocked ? "bg-blue-500 text-white" : "" } p-1 md:p-2 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors `}
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
                      totalUsers={total}
                      usersPerPage={userPerPage}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                />

   
            </PageContent>
            <DeleteUserModal />
            <BlockUserModal />
        </PageContainer>
    )
}