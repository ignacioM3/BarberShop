

export default function Register() {
  return (
    <div className="mt-5">
      <h1 className="text-4xl font-black text-center lg:text-2xl">Crear Cuenta</h1>
      <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2">Llena el formulario para {''}
        <span className="text-gray-500 font-bold">Crear tu cuenta</span>
      </p>

      <form action=""
         className="space-y-8 p-10 max-w-[650px] mx-auto  bg-white mt-10 lg:mt-0 lg:space-y-0 lg:max-w-[450px]"
         noValidate
      >
      <div className="flex flex-col gap-5 lg:gap-0">
          <label
            className="font-normal text-2xl lg:text-xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 lg:p-2 lg:rounded-sm  border-gray-300 border"

          />
          
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
          />
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
          />
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
          
          />
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-gray-600 rounded-md hover:bg-gray-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </div>
  )
}
