import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageContent } from "../../../components/styles/PageContent";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserById, updateUserAdmin } from "../../../api/UserApi";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { editBarberForm } from "../../../types";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../routes";
import ErrorLabel from "../../../components/styles/ErrorLabel";
import { TitleModal } from "../../../components/modal/TitleModal";
import { useEffect } from "react";

export function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const userId = id!;
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

    
    const {data, isLoading, isError} = useQuery({
        queryKey: ["editUser", userId],
        queryFn: () => getUserById(userId),
    });

    useEffect(() => {
        if(data){
            reset({
                name: data.name,
                email: data.email,
                number: data.number
            })
        }
    
    }, [data, reset]);
    const {mutate} = useMutation({
        mutationFn: updateUserAdmin,
            onError: (error) => {
              toast.error(error.message);
            },
            onSuccess: (data) => {
              reset({ name: "", email: "", number: 0 });
              toast.success(data);
              queryClient.invalidateQueries({ queryKey: ["getUsers"], exact: false });
              queryClient.invalidateQueries({ queryKey: ["editUser", userId]});
             
        
              setTimeout(() => {
                navigate(AppRoutes.userListAdmin.route());
              }, 2000);
            },
    })



    const handleEdit = (formData: editBarberForm) => {
        const data = {
            ...formData,
            _id: userId
        }
        mutate(data)
    }

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <h1>falta implementar error</h1>;

    if(data) return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Usuario</PageTitle>
            </PageHeader>
            <PageContent className="flex items-center justify-start">
                <form
                    className="bg-white shadow-md max-w-[650px] w-full rounded-md p-7 mt-4"
                    onSubmit={handleSubmit(handleEdit)}
                >
                    <TitleModal>Editar Usuario - {data?.name}</TitleModal>
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
                            onClick={() => navigate(AppRoutes.userListAdmin.route())}
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
    )
}
