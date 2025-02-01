import { PageContainer } from "../../../components/styles/PageContainer";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { PageContent } from "../../../components/styles/PageContent";
import { AppointmentDetails } from "../../../components/modal/appointment/AppointmentDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppointmentModal } from "../../../components/modal/appointment/AddAppointmentModal";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { getTodayAppointmentApi } from "../../../api/AppointmentApi";
import { generateTimeSlots } from "../../../utils/generateTime";
import { Appointment, UserListType } from "../../../types";

export function AppointmentToday() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const branchId = id!;

  const queryParams = new URLSearchParams(location.search);
  const detailsAppointment = queryParams.get('detailsAppointment');

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTodayAppointmentApi(branchId),
    queryKey: ["getTodayAppointment", branchId],
    retry: false,
  });

  console.log(data)


  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Falta implementar error</h1>;
  if (data) {
    const timeSlots = generateTimeSlots(data.branch.open, data.branch.close, 30);

    
    const getAppointmentName = (slot: string, barberId: string) => {
      const getAppointmentByBarberId = data.appointments.filter((a: Appointment) =>
        a.barberId === barberId ? a : null
      );
  

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
      <PageContainer>
        <PageHeader>
          <PageTitle>Turnos de hoy - {data.branch.name}</PageTitle>
        </PageHeader>
        <PageContent>
          {data.branch.barbers.map((barberAppointment: UserListType, index: string) => (
            <div key={index}>
              <h2 className="text-xl text-gray-500 mb-4">{barberAppointment.name}</h2>
              <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[1000px]">
                {timeSlots.map((slot, index) => {
                  const appointmentData = getAppointmentName(slot, barberAppointment._id);
                  return (
                    <div
                      key={index}
                      className={`flex text-center flex-col border ${appointmentData?.appointment.status === "completed"
                          ? "border-green-600 border-2"
                          : appointmentData?.appointment.status === "canceled"
                            ? "border-orange-600 border-2"
                            : "border-gray-400"

                        } p-2 rounded-md cursor-pointer w-[80px] items-center justify-center ${appointmentData ? "bg-gray-200" : "bg-white"
                        }`}
                      onClick={() =>
                        appointmentData ? navigate(location.pathname + `?detailsAppointment=${appointmentData.appointment._id}`) : navigate(location.pathname + `?time=${slot}&barberId=${barberAppointment._id}`)
                      }
                    >
                      <span className="font-bold">{slot}</span>
                      {appointmentData ? (
                        <span className={`font-bold ${appointmentData?.appointment.status === "completed"
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
            </div>
          ))}
        </PageContent>
        {detailsAppointment && <AppointmentDetails />}

        <AppointmentModal />
      </PageContainer>
    );
  }

}