import { useState } from "react";
import UserModal from "../../components/modal/UserListModal";
import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


type User = {
    nombre: string;
    numero: string;
    cortes: number;
}

export function UserList() {
    const [open, setOpen] = useState(false)
    const columns = ['Nombre', 'Número', 'Cortes'];
    const data: User[] = [
        { nombre: 'Maria Angeles', numero: '44330202', cortes: 3 },
        { nombre: 'Ignacio Marquez', numero: '4444444', cortes: 2 },
        { nombre: 'Thiago Silva', numero: '43029281', cortes: 1 }
    ];

    return (
        <PageContainer>
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
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border border-gray-400 text-center">
                                    <td className="px-6 py-4">{row.nombre}</td>
                                    <td className="px-6 py-4">{row.numero}</td>
                                    <td className="px-6 py-4">{row.cortes}</td>
                                    <td className="px-6 py-4 flex items-center gap-2 text-xl">
                                        <button className="border border-gray-700 p-2 rounded hover:bg-gray-400 hover:text-white hover:border-none transition-colors">
                                            <MdOutlineEdit />
                                        </button>
                                        <button className="border border-red-500 p-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors hover:border-none">
                                            <RiDeleteBin6Line />
                                        </button>
                                    </td>
                                </tr>

                            ))}
                           
                        </tbody>
                    </table>
                </div>

                <UserModal
                    open={open}
                    setOpen={setOpen}
                />
            </PageContent>

        </PageContainer>
    )
}