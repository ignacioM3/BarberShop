import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageTitle } from "../../components/styles/PageTitle";
import { getAppointmentByDayApi } from "../../api/AppointmentApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { generateTimeSlots } from "../../utils/generateTime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRoutes } from "../../routes";
import useAppointment from "../../hooks/useAppointment";
import { formattedDateForApi } from "../../utils/getFormatDay";
import { Appointment } from "../../types";
import { AppointmentStatus } from "../../types/appointment-status";

export function SelecetTime() {
  const { id } = useParams();
  const branchId = id!
  const { appointment, setAppointment, branch, setAppointments } = useAppointment()
  const navigate = useNavigate()

  const shortDate = appointment.day?.split("-").slice(0, 2).join("-");
  const dateForApi = formattedDateForApi(appointment.day)
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: number }[]>([]);
  const [timeSelect, setTimeSelect] = useState('')


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAppointmentByDayApi({ branchId, appointmentId: dateForApi }),
    queryKey: ["getAppointmentDayWeek", branchId, dateForApi],
    retry: false
  })


  const totalBarbers = data?.branch?.barbers.length | 0
  useEffect(() => {

    if (!branch) {
      navigate(AppRoutes.home.route(), { replace: true })
      return
    }

    if (data?.branch) {
      const generatedSlots = generateTimeSlots(data.branch.open, data.branch.close, 30)

      const updateSlots = generatedSlots.map(slot => {
        const appointmentsInTime = data.appointments?.filter((appointment: Appointment) => appointment.timeSlot === slot &&  appointment.status !== AppointmentStatus.CANCELED).length

        return {
          time: slot,
          available: Math.max(0, totalBarbers - appointmentsInTime)
        };
      })
      setTimeSlots(updateSlots);

    }
  }, [data]);

  const handleNext = () => {
    if (timeSelect.length < 1) {
      toast.error("Debe seleccionar un horario")
      return
    }
    setAppointment({ time: timeSelect })
    setAppointments(data.appointments)
    navigate(AppRoutes.selectBarberAppointment.route(branchId))
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
            timeSlots.map(({ time, available }, index) => {
              return (
                <div
                  key={index}
                  onClick={() => available > 0 && setTimeSelect(time)}
                  className={`flex text-center flex-col p-2 rounded-md w-[80px] items-center justify-center cursor-pointer ${timeSelect === time ? 'bg-gray-500 text-white' : available < 1 ? 'bg-gray-400' : 'bg-white'}`}
                >
                  <span className="font-bold">{time}</span>
                  <span className={`font-bold text-green-600 text-sm ${timeSelect === time && 'text-green-300'}`}>{available > 0 ? `${available} turnos` : "0 turnos"}</span>
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
