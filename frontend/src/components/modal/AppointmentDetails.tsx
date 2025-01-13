import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import { deleteAppointmentApi, getAppointmentByIdApi, updateStatusAppointmentApi } from "../../api/AppointmentApi";
import { MdCancelPresentation } from "react-icons/md";
import { toast } from "react-toastify";
import { AppointmentStatus } from "../../types/appointment-status";
import { deleteAppointmentApiType } from "../../types";


export function AppointmentDetails() {
  const navigate = useNavigate()
  const location = useLocation();
  const {id} = useParams()
  const branchId = id!
  const queryParams = new URLSearchParams(location.search);
  const AppointmentHours = queryParams.get('detailsAppointment')!
  const show = AppointmentHours ? true : false
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['appointment', AppointmentHours],
    queryFn: () => getAppointmentByIdApi(AppointmentHours),
    retry: false
  })

  const {mutate} = useMutation({
    mutationFn: updateStatusAppointmentApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["getTodayAppointment", branchId]})
      navigate(location.pathname, {replace: true})
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
      navigate(location.pathname, {replace: true})
    }
  })

  const handleUpdateStatus = (formData: string) => {
    mutate({ appointmentId: AppointmentHours, status: formData });
  };

  const handleDeleteAppointment = (formData: deleteAppointmentApiType) => {
    deleteAppointment(formData)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(location.pathname, { replace: true });
      }
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, navigate, location.pathname]);


  if (isError) return <h1>Falta implementar error</h1>

  if (isLoading || data) return (
    <div
      className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
      onClick={() => navigate(location.pathname, { replace: true })}
    >
      <div className="w-full h-full flex items-center justify-center mt-5 md:mt-0">
        <form
          className="bg-white w-full mx-5 max-w-[300px] rounded-md shadow-sm p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading && <LoadingSpinner />}
          {data && (
            <>
              <h2 className="font-bold text-center mb-2">Detalles del turno</h2>
              <div className="flex flex-col">
                <p className="flex justify-between font-bold">Nombre <span className="font-normal">{data.name}</span></p>
                <p className="flex justify-between font-bold">Hora <span className="font-normal">{data.timeSlot}</span></p>
                <p className="flex justify-between font-bold">Servicio <span className="font-normal">{data.service}</span></p>
                <p className="flex justify-between font-bold">Precio <span className="font-normal">${data.price}</span></p>
                <p className="flex justify-between font-bold">Whatsapp <span className="font-normal flex items-center gap-2">{data.whatsapp ?<a className="flex items-center gap-2" href={`http://wa.me/549${data.whatsapp}/`} target="_blank"> <FaWhatsapp className="text-green-500 cursor-pointer text-xl" /> {data.whatsapp} </a>: "Sin whatsapp"}</span></p>
                <p className="flex justify-between font-bold">Whatsapp <span className="font-normal flex items-center gap-2">{data.whatsapp ?<a className="flex items-center gap-2" href={`https://www.wa.me/${data.whastapp}/`} target="_blank"> <FaWhatsapp className="text-green-500 cursor-pointer text-xl" /> {data.whatsapp} </a>: "Sin whatsapp"}</span></p>
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
                    className="bg-blue-500 p-2 rounded-md cursor-pointer text-white hover:bg-blue-700 transition-colors"
                    >
                    <FaRegEdit />
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
