import { useEffect, useState } from "react";
import UserModal from "../../components/modal/UserListModal";
import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "../../api/AuthApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { UserListType } from "../../types";
import DeleteUserModal from "../../components/modal/DeleteUserModal";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";


export function UserList() {
    const columns = ['Nombre', 'Número', 'Cortes'];
    const [open, setOpen] = useState(false)
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
                    onClick={() => setOpen(true)}
                >
                    Agregar Usuario
                </ListAddButton>
            </PageHeader>
            <PageContent >
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
                                    data.users.map((row: UserListType, rowIndex: number) => (
                                        <tr key={rowIndex} className="border border-gray-400 text-center">
                                            <td className="px-6 py-4">{row.name}</td>
                                            <td className="px-6 py-4">{row.role}</td>
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

                <UserModal
                    open={open}
                    setOpen={setOpen}
                />
            </PageContent>

            <DeleteUserModal />

        </PageContainer>
    )
}