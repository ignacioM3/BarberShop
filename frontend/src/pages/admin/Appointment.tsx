import { useState } from "react";
import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { PageContent } from "../../components/styles/PageContent";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";


export function Appointment() {
    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Administrador de turnos</PageTitle>
            </PageHeader>
            <PageContent>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        to={AppRoutes.AppointmentToday.route()}
                        className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">

                        Turnos del dia

                    </Link>
                    <div className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">
                        <span>Turnos de la semana</span>
                    </div>
                    <div className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">
                        <span>Historial de turnos</span>
                    </div>
                </div>
            </PageContent>
        </PageContainer>
    )
}
