import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../styles/LoadingSpinner";
import { deleteAppointmentApi, getAppointmentByIdApi, updateStatusAppointmentApi } from "../../../api/AppointmentApi";
import { MdCancelPresentation } from "react-icons/md";
import { toast } from "react-toastify";
import { AppointmentStatus } from "../../../types/appointment-status";
import { deleteAppointmentApiType } from "../../../types";
import { IoClose } from "react-icons/io5";


export function AppointmentDetails() {
  const navigate = useNavigate()
  const location = useLocation();
  const {id : branchId} = useParams()
  const queryParams = new URLSearchParams(location.search);
  const AppointmentHours = queryParams.get('detailsAppointment') || "";
  const appointmentWeek = queryParams.get("appointmentWeek")
  const day = appointmentWeek ? appointmentWeek : new Date().getDate()
  const show = AppointmentHours ? true : false
  const queryClient = useQueryClient();

  const closeDetails = () => {
    queryParams.delete("detailsAppointment");
    if (!day) {
      navigate(location.pathname, { replace: true });
    } else {
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['AppointmentDetails', branchId, AppointmentHours],
    queryFn: () => AppointmentHours ? getAppointmentByIdApi(AppointmentHours) : Promise.reject("No appointment ID"),
    enabled: !!AppointmentHours, 
    retry: false
  });


  const {mutate} = useMutation({
    mutationFn: updateStatusAppointmentApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["getTodayAppointment", branchId]})
      queryClient.invalidateQueries({queryKey: ["getAppointmentDayWeek", day]})
      closeDetails()
    }
  })

  const {mutate: deleteAppointment} = useMutation({
    mutationFn: deleteAppointmentApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Eliminado correctamente")
      queryClient.invalidateQueries({queryKey: ["getTodayAppointment", branchId]})
      queryClient.invalidateQueries({queryKey: ["getAppointmentDayWeek", day]})
      closeDetails()
    }
  })

  const handleUpdateStatus = (formData: string) => {
    mutate({ appointmentId: AppointmentHours, status: formData });
  };

  const handleDeleteAppointment = (formData: deleteAppointmentApiType) => {
    deleteAppointment(formData)
  }




  if (isError) return <h1>Falta implementar Error</h1>

  if (isLoading || data) return (
    <div
      className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
      onClick={closeDetails}
    >
      <div className="w-full h-full flex items-center justify-center mt-5 md:mt-0">
        <form
          className="bg-white w-full mx-5 max-w-[300px] rounded-md shadow-sm p-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button>
            <IoClose
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer text-2xl"
              onClick={closeDetails}
            />
          </button>
          {isLoading && <LoadingSpinner />}
          {data && (
            <>
              <h2 className="font-bold text-center mb-2">Detalles del turno</h2>
              {data.status === AppointmentStatus.CANCELED && <h1 className="font-bold text-center text-orange-500">Turno Cancelado</h1>}
              <div className="flex flex-col">
                <p className="flex justify-between font-bold">Nombre <span className="font-normal">{data.name}</span></p>
                <p className="flex justify-between font-bold">Hora <span className="font-normal">{data.timeSlot}</span></p>
                <p className="flex justify-between font-bold">Servicio <span className="font-normal">{data.service}</span></p>
                <p className="flex justify-between font-bold">Precio <span className="font-normal">${data.price}</span></p>
                <p className="flex justify-between font-bold">Whatsapp <span className="font-normal flex items-center gap-2">{data.whatsapp ?<a className="flex items-center gap-2" href={`http://wa.me/549${data.whatsapp}/`} target="_blank"> <FaWhatsapp className="text-green-500 cursor-pointer text-xl" /> {data.whatsapp} </a>: "Sin whatsapp"}</span></p>
                <p className="flex justify-between font-bold">Instagram <span className="font-normal">{data.instagram ? <a className="flex items-center gap-2" href={`https://www.instagram.com/${data.instagram}/`} target="_blank"><FaInstagram className="text-[#E1306C] cursor-pointer text-xl" /> {data.instagram}</a> : "Sin instagram"}</span></p>
                <p className="flex justify-between font-bold">Turno <span className="font-normal">{data.manual ? "Manual" : "Online"}</span></p>

                <p className="text-center font-bold">Detalles</p>
                <p className="text-center">{data.details ? data.details : "no hay detalles"}</p>
                <div className="flex justify-center gap-2 mt-4">
                  <div 
                    className="bg-red-500 p-2 rounded-md cursor-pointer text-white hover:bg-red-700 transition-colors"
                    onClick={() => handleDeleteAppointment(data._id)}
                    >
                    <MdDelete />
                  </div>
            
                  <div 
                    className="bg-orange-500 p-2 rounded-md cursor-pointer text-white hover:bg-orange-600 transition-colors"
                    onClick={() => handleUpdateStatus(AppointmentStatus.CANCELED)}
                    >
                    <MdCancelPresentation />
                  </div>
                 
                  <div 
                    className="bg-green-500 p-2 rounded-md cursor-pointer text-white hover:bg-green-700 transition-colors"
                    onClick={() => handleUpdateStatus(AppointmentStatus.COMPLETED)}
                    >
                    <FaCheckSquare />
                  </div>
                </div>
              </div>
            </>
          )

          }
        </form>
      </div>
    </div>
  )
}
