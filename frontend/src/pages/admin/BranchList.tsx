import { useState } from "react";
import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { PageContent } from "../../components/styles/PageContent";
import { useQuery } from "@tanstack/react-query";
import { getAllBranchsApi } from "../../api/BranchApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdBlock, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BranchListType } from "../../types";
import { useNavigate } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { AddBarberToBranch } from "../../components/modal/AddBarberToBranch";

export function BranchList() {
    const columns = ['Nombre', 'Dirreción', 'Barberos']
    const [open, setOpen] = useState(false)
    const [addBarbers, setAddBarbers] = useState(false)

    const navigate = useNavigate()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['getBranchs'],
        queryFn: getAllBranchsApi,
        retry: false
    })

    if (isLoading) return <LoadingSpinner />
    if (isError) return <h1>Falta Implementar error</h1>

    if (data) return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    Sucursales
                </PageTitle>
                <ListAddButton
                    onClick={() => setOpen(true)}
                >
                    Agregar Sucursal
                </ListAddButton>
            </PageHeader>
            <PageContent>
                <div className="flex items-center justify-normal">
                    <table className="w-full text-sm text-left rtl:text-right border border-gray-400 shadow-lg max-w-[1000px] mx-auto">
                        <thead className="text-xs text-black uppercase border border-gray-400 text-center">
                            <tr>
                                {
                                    columns.map((col, index) => (
                                        <th key={index} scope="col" className="px-6 py-3 hidden md:table-cell">
                                            {col}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                        {
                                data ? (
                                    data.map((row: BranchListType, rowIndex: number) => (
                                        <tr key={rowIndex} className="border border-gray-400 text-center">
                                            <td className="md:px-6 py-4">{row.name}</td>
                                            <td className="md:px-6 py-4">{row.address}</td>
                                            <td className="md:px-6 py-4">{row.barbers.length}</td>
                                           
                                            <td className="px-6 py-4 flex items-center gap-2 text-xl">
                                            <button 
                                                onClick={() => setAddBarbers(true)}
                                                     className="border border-blue-500 p-1 md:p-2 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors hover:border-none"
                                                >
                                                    <IoPersonAddSharp />
                                                </button>
                                                <button className="border border-gray-700 p-1 md:p-2 rounded hover:bg-gray-400 hover:text-white hover:border-none transition-colors">
                                                    <MdOutlineEdit />
                                                </button>
                                                <button
                                                    className="border border-red-500 p-1 md:p-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors hover:border-none"
                                                    onClick={() => navigate(location.pathname + `?deleteProject=${row._id}`)}
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            
                                            </td>
                                        </tr>
                                    ))
                                ) : <tr><td colSpan={4} className="text-center p-3">No hay Sucursales</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </PageContent>

            <AddBarberToBranch 
                open={addBarbers}
                setOpen={setAddBarbers}
            />
        </PageContainer>
    )
}
