import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { getAllBranchsApi } from "../../api/BranchApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { PageTitle } from "../../components/styles/PageTitle";
import Carousel from "../../components/bits/Carousel";
import { CiShop } from "react-icons/ci";
import { useState } from "react";
import { CalendarReact } from "../../components/styles/CalendarReact";
import { Branch, Value } from "../../types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { toast } from "react-toastify";
import useAppointment from "../../hooks/useAppointment";


export function SelectBranchAppointment() {
  const navigate = useNavigate()
  const [branchId, setBranchIdState] = useState("")
  const {setAppointment, setBranch} = useAppointment()

  const setBranchCarrousel = (data: Branch) => {
    console.log("Seleccionado:", data);
    setBranch(data);
    setBranchIdState(data._id);  
  };


  const today = new Date()
  const [value, onChange] = useState<Value>(null);


  const disableDays = ({ date }: { date: Date }) => {
    const day = date.getDay();
    return day === 0 || day === 1 || date < today;
  };




  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBranchsApi,
    queryKey: ['getAllBranchAppointment']
  })

  const handleNext = () => {
    if(!value){
      toast.error("Debe seleccionar un dia")
    }else{
      const formattedDate = (value as Date).toISOString().split('T')[0].split('-').reverse().join('-');
      setAppointment({day: formattedDate})
      navigate(AppRoutes.selectTimeAppointment.route(branchId))
    }
  }
  if(isError) return <h1>falta implementar error</h1>
  return (
    <PageContainer>
      <PageContent className="md:mt-10">
        <PageTitle className="text-white font-bold">Turno Online</PageTitle>
        <hr className="mt-2 w-[30%] mx-auto" />
        <h2 className="text-center mt-2 font-bold text-gray-200">{branchId ? "Seleccioné el día" : "Seleccione la sucursal"}</h2>
        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {(data && !branchId) && (
            <div className="flex justify-center" /* style={{ height: '600px', position: 'relative' }} */ >
              <Carousel
                baseWidth={300}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                setBranchCarrousel={setBranchCarrousel}
                loop={true}
                items={data.map((branch: Branch) => ({
                  branch: branch,
                  name: branch.name,
                  address: branch.address,
                  _id: branch._id,
                  img: "https://i.pinimg.com/originals/e5/12/68/e51268203ad501704ff82ffa739e57ac.jpg",
                  icon: <CiShop className="h-[16px] w-[16px] text-white font-bold" />,
                }))}
                round={false}
              />
            </div>
          )}
          {branchId && (
            <div className="flex justify-center flex-col items-center gap-5">
              <CalendarReact
              value={value}
              onChange={onChange}
              disableDays={disableDays}
              />
              <div className="flex gap-4">
              <button 
                className="rounded-md bg-red-500 p-2 font-bold uppercase text-white"
                onClick={() => navigate(AppRoutes.home.route())}
                >Cancelar</button>
              <button 
              className="rounded-md bg-gray-500 p-2 font-bold uppercase text-white"
              onClick={() => handleNext()}
              >Siguiente</button>
              </div>
            </div>
          )}
        </div>

      </PageContent>
    </PageContainer>
  )
}
