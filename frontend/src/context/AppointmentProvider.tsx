import { createContext, useState } from "react";
import { Appointment, Branch } from "../types";

interface AppointmentForm{
    barberId?: string;
    branchId?: string;
    barberName?: string;
    time?: string;
    service?: string;
    day?: string;
    price?: number;
}

interface AppointmentContextType {
    appointment: AppointmentForm;
    appointments?: Appointment[];
    branch?: Branch;
    setAppointments: (appointment: Appointment[]) => void
    setAppointment: (appointment: Partial<AppointmentForm>) => void;
    clearAppointment: () => void;
    setBranch: (branch: Branch) => void;
  }
  

const AppointmentContext = createContext<AppointmentContextType>( {
  appointment: {},
  branch: undefined,
  setAppointment: () => {},
  setAppointments: () => {},
  appointments: [],
  clearAppointment: () => {},
  setBranch: () => {}
})

const AppointmentProvider = ({children}: {children: React.ReactNode}) =>{
  const [appointment, setAppointmentState] = useState<AppointmentForm>({})
  const [branch, setBranchState] = useState<Branch | undefined>(undefined)
  const [appointments, setAppointmentsState] = useState<Appointment []>([])
  const setAppointment = (data: Partial<Appointment>) => {
    setAppointmentState(prev => ({...prev, ...data}))
  }

  const setAppointments = (appointments: Appointment[]) =>{
    setAppointmentsState(appointments)
  }
  
  const clearAppointment = () =>{
    setAppointmentState({})
  }
  const setBranch = (data: Branch) => {
    setBranchState(data);
    console.log(branch)
  };

  return (
    <AppointmentContext.Provider
    value={{
      appointment,
      appointments,
      setAppointment,
      setAppointments,
      clearAppointment,
      branch,
      setBranch
    }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}


export {
  AppointmentProvider
}


export default AppointmentContext