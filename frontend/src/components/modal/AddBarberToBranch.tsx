import { BarberOutBranch, getDetailsBranch } from "../../types";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";

interface AddBarberToBranchInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  branch?: getDetailsBranch
  barbers: BarberOutBranch[]
}


export function AddBarberToBranch({ open, setOpen, branch, barbers }: AddBarberToBranchInterface) {

  return (
    <div
      className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
      onClick={() => setOpen(false)}
    >
      <div className="w-full h-full flex items-center justify-center">
        <form
          className="bg-white max-w-[400px] shadow-md rounded-md p-7 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl text-center font-bold my-2  border-b-2 pb-2">Agregar Barberos a <span className="font-bold text-gray-500">{branch?.name}</span></h2>
          <div>
            <h4 className=" font-bold text-xl text-gray-500 my-2">Barberos Actuales:</h4>
            {branch?.barbers.length ? branch.barbers.map((barber, i) => (
              <div className="flex items-center justify-between mt-2" key={i}>
                <span className="font-bold">{barber.name}</span>
                <RiDeleteBinLine className="text-xl text-red-600 cursor-pointer" />
              </div>
            )) : <span className="font-bold flex justify-center">No hay barberos agregados</span>}
            <h4 className="font-bold text-gray-500 mt-2">Barberos Disponibles:</h4>
            {barbers.length ? (
              barbers.map((barber) => (
                <div className="flex items-center justify-between mt-2" key={barber._id}>
                  <span className="font-bold">{barber.name}</span>
                  <IoMdPersonAdd className="text-xl text-green-500 cursor-pointer" />
                </div>
              ))
            ) : (
              <p className="font-bold flex justify-center">No hay barberos disponibles</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
