import { PageContainer } from "../../components/styles/PageContainer";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { PageContent } from "../../components/styles/PageContent";
import { AppointmentDetails } from "../../components/modal/AppointmentDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppointmentModal } from "../../components/modal/AddAppointmentModal";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getTodayAppointmentApi } from "../../api/AppointmentApi";
import useAuth from "../../hooks/useAuth";
import { generateTimeSlots } from "../../utils/generateTime";
import { Appointment } from "../../types";

export function AppointmentToday() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const branchId = id!;
  const { currentUser } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTodayAppointmentApi(branchId),
    queryKey: ["getTodayAppointmentApi", branchId],
    retry: false,
  });



  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Falta implementar error</h1>;
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
        const firtName = appointment.name.split(" ")[0]
        return firtName; 
      }

      return null;
    };

    return (
      <PageContainer className="h-full">
        <PageHeader>
          <PageTitle>Turnos de hoy</PageTitle>
        </PageHeader>
        <PageContent>
          <h2 className="text-xl text-gray-500 mb-4">Cesar</h2>
          <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[1000px]">
            {timeSlots.map((slot, index) => {
              const appointmentName = getAppointmentName(slot);
              return (
                <div
                  key={index}
                  className={`flex text-center flex-col border border-gray-400 p-2 rounded-md cursor-pointer w-[80px] items-center justify-center ${appointmentName ? "bg-gray-200" : "bg-white"
                    }`}
                  onClick={() =>
                    !appointmentName && navigate(location.pathname + `?time=${slot}`)
                  }
                >
                  <span className="font-bold">{slot}</span>
                  {appointmentName ? (
                    <span className="text-red-500 font-bold">{appointmentName}</span>
                  ) : (
                    <span className="text-green-500 font-bold uppercase">Libre</span>
                  )}
                </div>
              );
            })}
          </div>
        </PageContent>

        <AppointmentDetails />
        <AppointmentModal />
      </PageContainer>
    );
  }

}