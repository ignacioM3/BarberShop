import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TitleModal } from "../../../components/modal/TitleModal";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { useForm } from "react-hook-form";
import { createBranchApi } from "../../../api/BranchApi";
import { toast } from "react-toastify";
import { formDataCreateBranch } from "../../../types";
import { AppRoutes } from "../../../routes";
import { useNavigate } from "react-router-dom";
import ErrorLabel from "../../../components/styles/ErrorLabel";



export function CreateBranch() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    address: "",
    open: "",
    close: "",
    claritos: 0,
    corte: 0,
    global: 0
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialValues
  })

  const { mutate } = useMutation({
    mutationFn: createBranchApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['getBranchs'] })
      reset()
      
      setTimeout(() => {
        navigate(AppRoutes.branchListAdmin.route());
      }, 2000)

    }

  })

  const handleSubmitForm = (dataForm: formDataCreateBranch) => {
    const data = {
      name: dataForm.name,
      address: dataForm.address,
      open: dataForm.open,
      close: dataForm.close,
      prices: [
        { service: "claritos", price: dataForm.claritos },
        { service: "corte", price: dataForm.corte },
        { service: "global", price: dataForm.global }
      ]
    };
    mutate(data)
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          Crear Sucursal
        </PageTitle>
      </PageHeader>
      <PageContent className="flex items-center justify-center mb-20">
        <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="bg-white shadow-md max-w-[650px] w-full rounded-md p-7 mt-4"
        >
          <TitleModal className="mb-4">Nueva Sucursal</TitleModal>
          <div className="md:flex justify-between gap-3">
            <div className="my-2 flex-1">
              <label
                htmlFor="name"
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
              >Nombre
              {errors.name && (
                <ErrorLabel >{errors.name.message}</ErrorLabel>
              )}
              </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="text" 
                id="name" 
                placeholder="Ingrese el nombre" 
                {...register('name', {
                  required: "El nombre es obligatorio"
                })}
                />
            </div>
            <div className="my-2 flex-1">
              <label
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
                htmlFor="address">
                  Dirreción
                  {errors.address && (
                    <ErrorLabel>{errors.address.message}</ErrorLabel>
                  )}
                  </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="text" 
                id="address"
                placeholder="Ingrese la dirreción"
                {...register("address", {
                  required: "dirreción obligatoria"
                })}
                />
            </div>
          </div>
          <div className="md:flex md:justify-between gap-3">
            <div className="my-2 flex-1">
              <label
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
                htmlFor="open">
                  Apertura
                  {errors.open && (
                    <ErrorLabel>{errors.open.message}</ErrorLabel>
                  )}
                  </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="text" 
                id="open" 
                placeholder="Hora de apertura ej: 08:00" 
                {...register("open", {
                  required: "Falta Apertura"
                })}
                />
            </div>
            <div className="my-2 flex-1">
              <label
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
                htmlFor="close">
                  Ciere
                  {errors.close && ( 
                    <ErrorLabel>{errors.close.message}</ErrorLabel>
                  )}
                  </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="text" 
                id="close" 
                placeholder="Hora de cierre ej: 19:00"
                {...register("close",{
                  required: "falta cierre"
                })}
                />
            </div>
          </div>
          <div className="my-2">
            <label
              className="uppercase text-gray-600 font-bold flex items-center justify-between"
              htmlFor="corte">
                Corte
                {errors.corte && (
                  <ErrorLabel>{errors.corte.message}</ErrorLabel>
                )}
                </label>
            <input
              className="w-full mt-2 p-2 border rounded-md bg-gray-100"
              type="number" 
              id="corte" 
              placeholder="$ Precio de corte" 
              {...register('corte', {
                required: "precio obligatorio",
                valueAsNumber: true,
                validate: value => value !== 0 || 'El valor no puede ser 0'
              })}
              />
          </div>
          <div className="my-2">
            <label
              className="uppercase text-gray-600 font-bold flex items-center justify-between"
              htmlFor="claritos">
                Claritos
                {errors.claritos && (
                  <ErrorLabel>{errors.claritos.message}</ErrorLabel>
                )}
                </label>
            <input
              className="w-full mt-2 p-2 border rounded-md bg-gray-100"
              type="number" 
              id="claritos" 
              placeholder="$ Precio de claritos" 
              {...register("claritos", {
                required: "precio obligatorio",
                valueAsNumber: true,
                validate: value => value !== 0 || 'El valor no puede ser 0'
              })}
              />
          </div>
          <div className="my-2">
            <label
              className="uppercase text-gray-600 font-bold flex items-center justify-between"
              htmlFor="global">
                Global
                {errors.global && (
                  <ErrorLabel>{errors.global.message}</ErrorLabel>
                )}
                </label>
            <input
              className="w-full mt-2 p-2 border rounded-md bg-gray-100"
              type="number" 
              id="global" 
              placeholder="$ Precio de global" 
              {...register('global', {
                required: "precio obligatorio",
                valueAsNumber: true,
                validate: value => value !== 0 || 'El valor no puede ser 0'
              })}
              />
          </div>
          <div className="flex gap-4 mt-4">
            <input
              type="button"
              value="Cancelar"
              onClick={() => navigate(AppRoutes.branchListAdmin.route())}
              className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"

            />
            <input
              type="submit"
              className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
              value="Crear Sucursal"
            />

          </div>
        </form>
      </PageContent>
    </PageContainer>
  )
}
