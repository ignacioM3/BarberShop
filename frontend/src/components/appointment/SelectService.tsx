import useAppointment from "../../hooks/useAppointment";

interface Services{
  service?: string
  price?: number
}


interface SelectServiceProps{
  services?: Services[]
}


export function SelectService({services} : SelectServiceProps) {
  const { setAppointment, appointment } = useAppointment();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = services?.find(ser => ser.service === e.target.value)
    setAppointment({ service: e.target.value, price: selectedService?.price });
  };
  return (
    <select
      className="w-full outline-none rounded-sm p-2 cursor-pointer text-center uppercase"
      onChange={handleChange}
      value={appointment.service ? appointment.service : ""}
    >
      <option value="">Seleccione un servicio</option>
     {
        
        services?.map((ser, index) => (
        <option value={ser.service} key={index} className="uppercase">{ser.service}</option>
      ))
     }
    </select>
  )
}
