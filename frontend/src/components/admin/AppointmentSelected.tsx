import { Link } from 'react-router-dom'
import { AppRoutes } from '../../routes'

interface AppointmentSelectedProps{
    branchId: string
}

export  function AppointmentSelected({branchId}: AppointmentSelectedProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
    <Link
        to={AppRoutes.AppointmentToday.route(branchId)}
        className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">

        Turnos del dia

    </Link>
    <Link
        className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]"
        to={AppRoutes.AppointmentWeek.route(branchId)}
    >
        <span>Turnos de la semana</span>
    </Link>
    <div className="bg-gray-400 p-8 rounded-md cursor-pointer uppercase font-bold text-white hover:bg-gray-500 transition-colors w-full text-center md:max-w-[300px]">
        <span>Historial de turnos</span>
    </div>
</div>
  )
}
