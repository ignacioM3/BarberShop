import { useNavigate } from "react-router-dom";
import { TitleModal } from "../../../components/modal/TitleModal";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { AppRoutes } from "../../../routes";
import { useForm } from "react-hook-form";
import ErrorLabel from "../../../components/styles/ErrorLabel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBarberApi } from "../../../api/BarberApi";
import { toast } from "react-toastify";
import { CreateBarberForm } from "../../../types";

export function CreateBarber() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const initialValues = {
    name: "",
    email: "",
    number: "",
    password: "",
    password_confirmation: ''

  }
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: initialValues
  })

  const { mutate } = useMutation({
    mutationFn: createBarberApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['getBarbers'], exact: false })
      reset()

      setTimeout(() => {
        navigate(AppRoutes.barberListAdmin.route());
      }, 2000)
    }

  })
  const password = watch('password')

  const handleCreate = (formData: CreateBarberForm) => {
    mutate(formData)
  }
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Crear Barbero</PageTitle>
      </PageHeader>

      <PageContent className="flex items-center justify-start">
        <form
          className="bg-white shadow-md max-w-[650px] w-full rounded-md p-7 mt-4"
          onSubmit={handleSubmit(handleCreate)}
        >
          <TitleModal>Nuevo Barbero</TitleModal>
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
                {...register('name', {
                  required: 'El nombre es obligatorio'
                })}
                placeholder="Ingrese el nombre"
              />
            </div>
            <div className="my-2 flex-1">
              <label
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
                htmlFor="number">
                Número (Opcional)

              </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="number"
                id="number"
                placeholder="Ingrese el número"

              />
            </div>
          </div>
          <div className="my-2 flex-1">
            <label
              htmlFor="email"
              className="uppercase text-gray-600 font-bold flex items-center justify-between"
            >Email
              {errors.email && (
                <ErrorLabel>{errors.email.message}</ErrorLabel>
              )}
            </label>
            <input
              className="w-full mt-2 p-2 border rounded-md bg-gray-100"
              type="email"
              id="email"
              {...register('email', {
                required: "El email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                }
              })}
              placeholder="Ingrese el email"
            />
          </div>

          <div className="md:flex justify-between gap-3">
            <div className="my-2 flex-1">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
              >Password
                {errors.password && (
                  <ErrorLabel>{errors.password.message}</ErrorLabel>
                )}
              </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="password"
                id="password"
                {...register("password", {
                  required: "El password es obligatorio",
                  minLength: {
                    value: 8,
                    message: 'El password debe ser mínimo 8 caracteres'
                  }
                })}
                placeholder="Ingrese el password"
              />
            </div>
            <div className="my-2 flex-1">
              <label
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
                htmlFor="password_confirmation">
                Repetí el Password
                {errors.password_confirmation && (
                  <ErrorLabel>{errors.password_confirmation.message}</ErrorLabel>
                )}
              </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="password"
                id="password_confirmation"
                placeholder="Repita el password"
                {...register('password_confirmation', {
                  required: "El password es obligatorio",
                  validate: value => value === password || 'Los password no son iguales'
                })}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <input
              type="button"
              onClick={() => navigate(AppRoutes.barberListAdmin.route())}
              value="Cancelar"
              className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"

            />
            <input
              type="submit"
              className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
              value="Crear Barbero"
            />

          </div>
        </form>
      </PageContent>
    </PageContainer>
  )
}
