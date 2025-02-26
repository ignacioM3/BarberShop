import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageTitle } from "../../components/styles/PageTitle";
import { getAppointmentByDayApi } from "../../api/AppointmentApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { generateTimeSlots } from "../../utils/generateTime";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRoutes } from "../../routes";

export function SelecetTime() {
  const branchId = "67b4088ad19544573d94fe24";
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const day = queryParams.get('day')!
  const shortDate = day?.split("-").slice(0, 2).join("-");

  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [timeSelect, setTimeSelect] = useState('')


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAppointmentByDayApi({ branchId, appointmentId: "2025-02-28" }),
    queryKey: ["getAppointmentDayWeek", shortDate],
    retry: false
  })
  useEffect(() => {
    if (data) {
      setTimeSlots(generateTimeSlots(data.branch.open, data.branch.close, 30));

    }
  }, [data]);

  const handleNext = () => {
    if(timeSelect.length < 1){
      toast.error("Debe seleccionar un horario")
      return
    }

    navigate(AppRoutes.selectBarberAppointment.route(branchId) + `?time=${timeSelect}`)
  }

  if (isError) return <h1>Falta Implementar error</h1>

  return (
    <PageContainer>
      <PageContent className="md:mt-10">
        <PageTitle className="text-white font-bold">Seleccione el horario</PageTitle>
        <p className="text-center text-white font-bold mt-4">Fecha Seleccionada: {shortDate}</p>
        {isLoading && (
          <div className="mt-8">
            <LoadingSpinner />
          </div>
        )}
        <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[800px] mt-8">
          {timeSlots.length > 0 && (
            timeSlots.map((slot, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setTimeSelect(slot)}
                  className={`flex text-center flex-col p-2 rounded-md w-[80px] items-center justify-center cursor-pointer ${timeSelect === slot ? 'bg-gray-500 text-white' : 'bg-white'}`}
                >
                  <span className="font-bold">{slot}</span>
                  <span className={`font-bold text-green-600 text-sm ${timeSelect === slot && 'text-green-300'}`}>3 turnos</span>
                </div>
              )
            })
          )}
        </div>
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

      </PageContent>
    </PageContainer>
  )
}
