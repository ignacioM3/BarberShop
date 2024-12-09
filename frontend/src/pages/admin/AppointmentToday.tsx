import { useState } from "react";
import { ListAddButton } from "../../components/styles/LinkButton";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { PageContent } from "../../components/styles/PageContent";
import { AppointmentDetails } from "../../components/modal/AppointmentDetails";
import { useLocation, useNavigate } from "react-router-dom";


export  function AppointmentToday() {
  const navigate = useNavigate()
  const location = useLocation()
    
    const [open, setOpen] = useState(false)
  return (
    <PageContainer className="h-full">
        <PageHeader>
            <PageTitle>Turnos de hoy</PageTitle>
            <ListAddButton
                    onClick={() => setOpen(true)}
                >
                    Agregar Turno
                </ListAddButton>
        </PageHeader>
        <PageContent>
          <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[1000px]">
            <div 
              className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center"
              onClick={() => navigate(location.pathname + `?detailsAppointment=123123`)}
              >
              <span className="font-bold">10:00</span>
              <span>Nacho</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">10:30</span>
              <p>Gabriel</p>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">11:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">11:30</span>
              <span className="text-green-500 font-bold uppercase">libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">12:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">12:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">13:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">13:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">14:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">14:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">15:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">15:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">16:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>
            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">16:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>
            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">17:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>
            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">17:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">18:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>
            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">18:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>
            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">19:00</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>
            <div className="flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center">
              <span className="font-bold">19:30</span>
              <span className="text-green-500 font-bold uppercase">Libre</span>
            </div>

          </div>
        </PageContent>

        <AppointmentDetails />
    </PageContainer>
  )
}
