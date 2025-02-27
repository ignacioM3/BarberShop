
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { PageContent } from "../../../components/styles/PageContent";

import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { getAllBranchsApi } from "../../../api/BranchApi";
import { useQuery } from "@tanstack/react-query";
import { UserRole } from "../../../types/use-role";
import { useState } from "react";
import { AppointmentSelected } from "../../../components/admin/AppointmentSelected";
import { Branch } from "../../../types";


export function Appointment() {
    const { currentUser } = useAuth()
    const [branchId, setBranchId] = useState<string | null>(null)

    const { data, isError, isLoading } = useQuery({
        queryKey: ['getBranchs'],
        queryFn: getAllBranchsApi,
        retry: false
    })


    if (isLoading) return <LoadingSpinner />
    if (isError) return <h1>Falta Implementar error</h1>
    if (currentUser?.role === UserRole.ADMIN) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Eliga el local</PageTitle>
                </PageHeader>
                <PageContent>
                    {!branchId && (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            {data ? data.map((branch: Branch, index: string) => (
                                <div
                                    key={index}
                                    onClick={() => setBranchId(branch._id)}
                                    className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">
                                    {branch.name}
                                </div>
                            )) : (
                                <PageTitle>No hay local creado</PageTitle>
                            )}
                        </div>
                    )}
                    {branchId && <AppointmentSelected branchId={branchId} />}
                </PageContent>
            </PageContainer>
        )

    }
    if (currentUser?.role === UserRole.BARBER) {
        const userBranch = data?.find((branch: Branch) =>
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
                    <PageTitle>Eliga el local</PageTitle>
                </PageHeader>
                <PageContent>
                    {!branchId && (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div
                                onClick={() => setBranchId(userBranch._id)}
                                className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">
                                {userBranch.name}
                            </div>
                        </div>
                    )}
                    {branchId && <AppointmentSelected branchId={branchId} />}
                </PageContent>
            </PageContainer>
        )
    }

}
