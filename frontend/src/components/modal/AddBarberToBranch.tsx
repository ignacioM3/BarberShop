interface AddBarberToBranchInterface{
    open: boolean;
    setOpen: (open: boolean) => void;
}


export  function AddBarberToBranch({open, setOpen}: AddBarberToBranchInterface) {
  return (
    <div 
        className={`${open ? 'fixed': 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
        onClick={() => setOpen(false)}
        >
            <div className="w-full h-full flex items-center justify-center"> 
                <form 
                className="bg-white max-w-[400px] shadow-md rounded-md p-7 mt-4"
                onClick={(e) => e.stopPropagation()}
                >
                    <h2>Agregar Barberos a Munro</h2>
                </form>
            </div>
    </div>
  )
}
