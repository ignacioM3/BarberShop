import { useNavigate, useParams } from "react-router-dom";
import { TitleModal } from "../../../components/modal/TitleModal";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { AppRoutes } from "../../../routes";
import { useForm } from "react-hook-form";
import ErrorLabel from "../../../components/styles/ErrorLabel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editBarberForm } from "../../../types";
import { getUserById, updateUserAdmin } from "../../../api/UserApi";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { useEffect, useState } from "react";

export function EditBarber() {
  const navigate = useNavigate();
  const [hasEdited, setHasEdited] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const barberId = id!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editBarber", barberId],
    retry: false,
    queryFn: () => getUserById(barberId),
  });
  
  const initialValues = {
    name: "",
    email: "",
    number: 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  
  useEffect(() => {
    if (data && !hasEdited) {
      reset({
        name: data.name,
        email: data.email,
        number: data.number
      });
    }
  }, [data, reset, hasEdited]);


  const { mutate } = useMutation({
    mutationFn: updateUserAdmin,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setHasEdited(true);
      reset({ name: "", email: "", number: 0 });
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getBarbers"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["editBarber", barberId]});
     

      setTimeout(() => {
        navigate(AppRoutes.barberListAdmin.route());
      }, 2000);
    },
  });




  const handleCreate = (formData: editBarberForm) => {
    const data = {
      ...formData,
      _id: barberId,
    };
    mutate(data);
  };

  if (isError) return <h1>falta implementar error</h1>;
  if (isLoading) return <LoadingSpinner />;
  if (data)
    return (
      <PageContainer>
        <PageHeader>
          <PageTitle>Barbero</PageTitle>
        </PageHeader>

        <PageContent className="flex items-center justify-start">
          <form
            className="bg-white shadow-md max-w-[650px] w-full rounded-md p-7 mt-4"
            onSubmit={handleSubmit(handleCreate)}
          >
            <TitleModal>Editar Barbero - {data?.name}</TitleModal>
            <div className="md:flex justify-between gap-3">
              <div className="my-2 flex-1">
                <label
                  htmlFor="name"
                  className="uppercase text-gray-600 font-bold flex items-center justify-between"
                >
                  Nombre
                  {errors.name && (
                    <ErrorLabel>{errors.name.message}</ErrorLabel>
                  )}
                </label>
                <input
                  className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div className="my-2 flex-1">
                <label
                  className="uppercase text-gray-600 font-bold flex items-center justify-between"
                  htmlFor="number"
                >
                  Número (Opcional)
                </label>
                <input
                  className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                  type="number"
                  id="number"
                  placeholder="Ingrese el número"
                  {...register('number')}
                />
              </div>
            </div>
            <div className="my-2 flex-1">
              <label
                htmlFor="email"
                className="uppercase text-gray-600 font-bold flex items-center justify-between"
              >
                Email
                {errors.email && (
                  <ErrorLabel>{errors.email.message}</ErrorLabel>
                )}
              </label>
              <input
                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                type="email"
                id="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
                placeholder="Ingrese el email"
              />
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
                value="Editar Barbero"
              />
            </div>
          </form>
        </PageContent>
      </PageContainer>
    );
}
