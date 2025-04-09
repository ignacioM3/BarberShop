import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../components/styles/LoadingSpinner"
import { getAllBranchPublicApi } from "../../api/PublicApi"
import { BranchPublicPrice } from "../../types"


export function Price() {

  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBranchPublicApi,
    queryKey: ['getAllBranchsPublic']
  })

  if (isError) return <h1>falta implementar error</h1>
  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <LoadingSpinner />
    </div>
  )

  if (data) return (
    <div className="my-5 mt-[30px] md:mt-[100px]">
      <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2 text-white">
        Bienvenido a tu Barberia{" "}
        <span className="text-gray-200 font-bold">Precio de nuestras sucursales</span>
      </p>
      <div>
        <h2 className="text-xl font-bold text-gray-200 text-center py-5">Precios</h2>
       <div className="flex flex-wrap justify-center items-center gap-4">
        {data.map((branch: BranchPublicPrice) => (
          <div key={branch._id} className="rounded-lg p-4 mb-4 bg-gray-700 text-white max-w-[250px] w-full mx-5 shadow-lg transition-transform hover:scale-105 duration-300 cursor-pointer">
            <h3 className="text-xl font-semibold text-center">{branch.name}</h3>
            <ul className="mt-2">
              {branch.prices.map((price, index) => (
              <li key={index} className="flex justify-between gap-2 py-1 border-b border-gray-300 last:border-none">
                  <span className="font-bold text-gray-300 capitalize ">{price.service}</span>
                  <span className="text-lg font-bold text-green-400">${price.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
       </div>
      </div>
    </div>
  )
}
