import { Link, useLocation } from "react-router-dom";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { addDays, startOfWeek } from "date-fns";
import { AppointmentWeekDay } from "../appointment/AppointmentWeekDay";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";



export function AppointmentWeek() {
  const [weekOffset, setWeekOffset] = useState(0);
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const appointmentWeekShow = queryParams.get("appointmentWeek")
  const show = appointmentWeekShow ? true : false

  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const selectedWeekStart = addDays(currentWeekStart, weekOffset * 7);
  const days = Array.from({ length: 5 }, (_, i) =>
    addDays(selectedWeekStart, i + 2).getDate()
  );

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Turnos de la semana</PageTitle>
      </PageHeader>
      <PageContent>
        <h2 className="text-xl text-gray-500 mb-4">Seleccioné un día</h2>
        <div className="flex justify-between items-center mb-4 max-w-[400px]">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            <FaChevronLeft />
          </button>
          <span className="font-semibold">
            Semana del {selectedWeekStart.toLocaleDateString()}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="flex md:justify-start">
          <div className="flex gap-2 md:gap-4">
            {["Mar", "Mie", "Jue", "Vie", "Sab"].map((day, index) => (
              <Link
                to={location.pathname + `?appointmentWeek=${days[index].toString()}`}
                key={index}
                className="bg-gray-500 text-center font-bold text-white p-2 rounded-sm cursor-pointer hover:bg-gray-400 transition-colors"
              >
                {day} {days[index]}
              </Link>
            ))}
          </div>
        </div>
        {show && <AppointmentWeekDay />}
      </PageContent>
    </PageContainer>
  )
}
