import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageTitle } from "../../components/styles/PageTitle";
import { getFormattedDates } from "../../utils/getFormatDay";
import { getAppointmentByDayApi } from "../../api/AppointmentApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { generateTimeSlots } from "../../utils/generateTime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function SelecetTimeAndBarber() {
  const branchId = "67b4088ad19544573d94fe24";
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const day = queryParams.get('day')
  const { formatForApi, formattedDate } = getFormattedDates(day);

  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [timeSelect, setTimeSelect] = useState('')


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAppointmentByDayApi({ branchId, appointmentId: formatForApi }),
    queryKey: ["getAppointmentDayWeek", day],
    retry: false
  })
  useEffect(() => {
    if (data) {
      setTimeSlots(generateTimeSlots(data.branch.open, data.branch.close, 30));

    }
  }, [data]);


  if (isError) return <h1>Falta Implementar error</h1>

  return (
    <PageContainer>
      <PageContent className="md:mt-10">
        <PageTitle className="text-white font-bold">Seleccione el horario</PageTitle>
        <p className="text-center text-white font-bold mt-4">Fecha Seleccionada: {formattedDate}</p>
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

      </PageContent>
    </PageContainer>
  )
}
