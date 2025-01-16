import { Link, useLocation, useParams } from "react-router-dom";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageHeader } from "../../components/styles/PageHeader";
import { PageTitle } from "../../components/styles/PageTitle";
import { addDays, startOfWeek } from "date-fns";
import { AppointmentWeekDay } from "./AppointmentWeekDay";


const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 }); 
const days = Array.from({ length: 5 }, (_, i) => addDays(startOfCurrentWeek, i + 2).getDate());


export  function AppointmentWeek() {
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)
   const appointmentWeekShow = queryParams.get("appointmentWeek")
   const show = appointmentWeekShow ? true : false


  return (
    <PageContainer>
        <PageHeader>
            <PageTitle>Turnos de la semana</PageTitle>
        </PageHeader>
        <PageContent>
            <h2 className="text-xl text-gray-500 mb-4">Seleccioné un día</h2>
            <div className="flex justify-center md:justify-start">
                <div className="flex gap-2 md:gap-4">
                {["Mar", "Mie", "Jue", "Vie", "Sab"].map((day, index) => (
              <Link
                to={location.pathname + `?appointmentWeek=${days[index].toString()}`}
                key={index}
                className="bg-gray-500 text-white p-2 rounded-sm cursor-pointer hover:bg-gray-400 transition-colors"
              >
                {day} {days[index]}
              </Link>
            ))}
                </div>
            </div>
        </PageContent>
        {show && <AppointmentWeekDay />}
    </PageContainer>
  )
}
