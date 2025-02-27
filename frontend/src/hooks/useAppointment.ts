import { useContext } from "react"
import AppointmentContext from "../context/AppointmentProvider"

const useAppointment = () =>{
    return useContext(AppointmentContext)
}

export default useAppointment