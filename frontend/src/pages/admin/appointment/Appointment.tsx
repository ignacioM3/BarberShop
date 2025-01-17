
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { PageContent } from "../../../components/styles/PageContent";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../routes";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { getAllBranchsApi } from "../../../api/BranchApi";
import { useQuery } from "@tanstack/react-query";
import { UserRole } from "../../../types/use-role";


export function Appointment() {
    const { currentUser } = useAuth()


    const { data, isError, isLoading } = useQuery({
        queryKey: ['getBranchs'],
        queryFn: getAllBranchsApi,
        retry: false
    })


    if (isLoading) return <LoadingSpinner />
    if (isError) return <h1>Falta Implementar error</h1>
    if (currentUser?.role === UserRole.ADMIN || currentUser?.role === UserRole.BARBER) {
        const userBranch = data?.find(branch =>
            branch.barbers.some(barber => barber._id === currentUser?._id)
        );

        if (!userBranch) return (
            <PageContainer>
                <PageHeader>
                    <PageTitle className="text-center text-red-700 uppercase">No tenes local asignado</PageTitle>
                </PageHeader>
            </PageContainer>
        )

        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Administrador de turnos</PageTitle>
                </PageHeader>
                <PageContent>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            to={AppRoutes.AppointmentToday.route(userBranch?._id)}
                            className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">

                            Turnos del dia

                        </Link>
                        <Link 
                            className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]"
                            to={AppRoutes.AppointmentWeek.route(userBranch?._id)}
                            >
                            <span>Turnos de la semana</span>
                        </Link>
                        <div className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">
                            <span>Historial de turnos</span>
                        </div>
                    </div>
                </PageContent>
            </PageContainer>
        )
    }

}
