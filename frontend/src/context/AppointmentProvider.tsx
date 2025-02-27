import { createContext, useState } from "react";
import { Branch } from "../types";

interface Appointment{
    barberId?: string;
    branchId?: string;
    barberName?: string;
    time?: string;
    service?: string;
    day?: string;
    price?: number;
}

interface AppointmentContextType {
    appointment: Appointment;
    branch?: Branch;
    setAppointment: (appointment: Partial<Appointment>) => void;
    clearAppointment: () => void;
    setBranch: (branch: Branch) => void;
  }
  

const AppointmentContext = createContext<AppointmentContextType>( {
  appointment: {},
  branch: undefined,
  setAppointment: () => {},
  clearAppointment: () => {},
  setBranch: () => {}
})

const AppointmentProvider = ({children}: {children: React.ReactNode}) =>{
  const [appointment, setAppointmentState] = useState<Appointment>({})
  const [branch, setBranchState] = useState<Branch | undefined>(undefined)

  const setAppointment = (data: Partial<Appointment>) => {
    setAppointmentState(prev => ({...prev, ...data}))
    console.log(data)
  }
  const clearAppointment = () =>{
    setAppointmentState({})
  }
  const setBranch = (data: Branch) => {
    setBranchState(data);
  };

  return (
    <AppointmentContext.Provider
    value={{
      appointment,
      setAppointment,
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