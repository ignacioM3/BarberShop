import { createContext } from "react";

interface Appointment{
    barberId: string;
    branchId: string;
    time: string;
}

interface AppointmentContextType {
    appointment: Appointment | null;
    setAppointment: (appointment: Appointment) => void;
    clearAppointment: () => void;
    setBarberId: (barberId: string) => void;
    setService: (service: string) => void;
    setTime: (time: string) => void;
  }
  

const appointmentContext = createContext<AppointmentContextType | undefined>(undefined)