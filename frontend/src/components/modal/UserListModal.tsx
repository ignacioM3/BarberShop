interface UserModalInterface{
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function UserModal({open, setOpen}: UserModalInterface){
    return(
        <div 
        className={`${open ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
        onClick={() => setOpen(false)}
    >
        <div className="w-full h-full flex items-center justify-center">
            <form
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[400px] shadow-md rounded-md p-7"
            >
                <h1 className="text-center text-2xl font-bold text-gray-600 border-b border-gray-600 pb-3">Crear Usuario</h1>
                <div className="my-4">
                    <label htmlFor="dni" className="uppercase text-gray-600 block font-bold">
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        id="dni"
                        className="w-full mt-3 p-3 border rounded-md bg-gray-100"
                        placeholder="Ingrese el Nombre"
                        />
                </div>
                <div className="my-4">
                    <label 
                        htmlFor="numero"
                        className="uppercase text-gray-600 block font-bold"
                        >
                        Numero
                    </label>
                    <input 
                        type="number" 
                        className="w-full mt-3 p-3 border rounded-md bg-gray-100"
                        id="numero"
                        placeholder="Ingrese el Numero"
                        />
                </div>

                <input 
                    type="submit" 
                    className="bg-green-500 w-full py-3 mb-4 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                    value="Crear Usuario"
                    />
                <input 
                    type="button"
                    value="Cancelar"
                     className="bg-red-500 w-full py-3 mb-4 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                    onClick={() => setOpen(false)}
                    />
            </form>
        </div>
    </div>
    )
} 