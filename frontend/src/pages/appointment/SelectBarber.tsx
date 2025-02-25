import { useNavigate } from "react-router-dom"
import { PageContainer } from "../../components/styles/PageContainer"
import { PageContent } from "../../components/styles/PageContent"
import { PageTitle } from "../../components/styles/PageTitle"
import { useState } from "react";
import { toast } from "react-toastify";
import { AppRoutes } from "../../routes";
import { SelectService } from "../../components/appointment/SelectService";


export function SelectBarber() {
  const navigate = useNavigate();
  const branchId = "67b4088ad19544573d94fe24";

  const [selectedBarber, setSelectedBarber] = useState("")
  const handleNext = () => {
    if(selectedBarber.length < 1){
      toast.error("Debe seleccionar un barbero")
      return
    }
    navigate(AppRoutes.resumenAppointment.route(branchId))
  }

  return (
    <PageContainer>
      <PageContent className="md:mt-12">
        <PageTitle className="text-white font-bold text-center">Seleccione el Barbero y Servicio</PageTitle>
        <div className="flex items-center justify-center mt-9 gap-4 flex-col shadow-md w-full p-4 rounded-md max-w-[450px] mx-auto">
          <div className="w-[80%]">
            <h3 className="text-center text-white font-bold mb-4">Servicio</h3>
          <SelectService/>
          </div>
          <h1 className="font-bold uppercase text-white">Disponible </h1>
          <span 
            className={`bg-amber-600 p-3 rounded-md cursor-pointer font-bold text-white hover:bg-amber-700 transition-colors ${selectedBarber === "1" && 'bg-amber-700'}`}
            onClick={ () => setSelectedBarber("1")}
            >Barbero 1</span>
          <h1 className="font-bold text-white uppercase">Reservados</h1>
          <div className="flex gap-4">
            <span className="bg-gray-400 p-3 rounded-md cursor-default font-bold text-white">Barbero 2</span>
            <span className="bg-gray-400 p-3 rounded-md cursor-default font-bold text-white">Barbero 3</span>
          </div>
          <hr className="w-[80%] border-orange-600" />
          <div className="flex items-center justify-center mt-4 gap-4">
            <button
              className="bg-red-500 p-2 w-[100px] rounded-md cursor-pointer text-white font-bold hover:bg-red-600 transition-colors"
              onClick={() => navigate(-1)}
            >Volver</button>
            <button
              className="bg-green-500 p-2 w-[100px] rounded-md cursor-pointer text-white font-bold hover:bg-green-600 transition-colors"
              onClick={() => handleNext()}
            >Siguiente</button>
          </div>
        </div>

      </PageContent>
    </PageContainer>
  )
}
