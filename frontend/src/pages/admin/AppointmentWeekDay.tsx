import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getAppointmentByDayApi } from "../../api/AppointmentApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PageContent } from "../../components/styles/PageContent";
import { generateTimeSlots } from "../../utils/generateTime";
import useAuth from "../../hooks/useAuth";
import { Appointment } from "../../types";
import { AppointmentDetails } from "../../components/modal/AppointmentDetails";
import { AppointmentModal } from "../../components/modal/AddAppointmentModal";
import { getFormattedDates } from "../../utils/getFormatDay";

export function AppointmentWeekDay() {
  const { id } = useParams()
  const branchId = id!;
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const day = queryParams.get("appointmentWeek")
  const detailsAppointment = queryParams.get('detailsAppointment');
  const {currentUser} = useAuth();
  const navigate = useNavigate()
  

  const { formatForApi, formattedDate } = getFormattedDates(day);
  

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAppointmentByDayApi({ branchId, appointmentId: formatForApi }),
    queryKey: ["getAppointmentDayWeek", day],
    retry: false
  })

  if (isLoading) return (
    <div className="mt-20">
      <LoadingSpinner />
    </div>
  )
  if (isError) return <h1>falta implementar error</h1>

  if (data) {
    const timeSlots = generateTimeSlots(data.branch.open, data.branch.close, 30);
    
        const getAppointmentByBarberId = data.appointments.filter((a: Appointment) =>
          a.barberId === currentUser?._id ? a : null
        );
    
        const getAppointmentName = (slot: string) => {
          const appointment = getAppointmentByBarberId.find(
            (a: Appointment) => a.timeSlot === slot
          );
    
          
          if (appointment) {
            const firtName = appointment.name.split(" ")[0];
            return { firtName, appointment };
          }
    
          return null;
        };

    return (
      <PageContent className="mt-5">
        <span className="text-gray-500">Fecha seleccionada: {formattedDate}</span>
        <h2 className="text-xl text-gray-500 mb-4">{currentUser?.name}</h2>
          <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[1000px]">
            {timeSlots.map((slot, index) => {
              const appointmentData = getAppointmentName(slot);
              return (
                <div
                  key={index}
                  className={`flex text-center flex-col border ${
                    appointmentData?.appointment.status === "completed" 
                    ? "border-green-600 border-2"
                    : appointmentData?.appointment.status === "canceled"
                    ? "border-orange-600 border-2" 
                    : "border-gray-400"

                    } p-2 rounded-md cursor-pointer w-[80px] items-center justify-center ${appointmentData ? "bg-gray-200" : "bg-white"
                    }`}
                  onClick={() =>
                    appointmentData ? navigate(location.pathname + `${ location.search}&detailsAppointment=${appointmentData.appointment._id}`) : navigate(location.pathname + `${ location.search}&time=${slot}`)
                  }
                >
                  <span className="font-bold">{slot}</span>
                  {appointmentData ? (
                    <span className={`font-bold ${
                      appointmentData?.appointment.status === "completed" 
                    ? "text-green-600 border-2"
                    : appointmentData?.appointment.status === "canceled"
                    ? "text-orange-600 border-2" 
                    : "text-gray-400"
                    } `}>{appointmentData.appointment.status === "canceled" ? "Libre" : appointmentData.firtName}</span>
                  ) : (
                    <span className="text-green-500 font-bold uppercase">Libre</span>
                  )}
                </div>
              );
            })}
          </div>
            {detailsAppointment && <AppointmentDetails />}
            <AppointmentModal />
      </PageContent>
      
    )
  }
}
