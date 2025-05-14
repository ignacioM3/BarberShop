import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBranchById, updateBranchApi } from "../../../api/BranchApi";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { PageContainer } from "../../../components/styles/PageContainer";
import { PageHeader } from "../../../components/styles/PageHeader";
import { PageTitle } from "../../../components/styles/PageTitle";
import { PageContent } from "../../../components/styles/PageContent";
import { TitleModal } from "../../../components/modal/TitleModal";
import ErrorLabel from "../../../components/styles/ErrorLabel";
import { AppRoutes } from "../../../routes";
import { toast } from "react-toastify";
import { formDataCreateBranch } from "../../../types";

export function EditBranch() {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const [hasEdited, setHasEdited] = useState(false);
    const { id } = useParams();
    const branchId = id!;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editBranch', branchId],
        retry: false,
        queryFn: () => getBranchById(branchId)
    });

    const { mutate } = useMutation({
        mutationFn: updateBranchApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            setHasEdited(true)
            reset({
                name: "",
                address: "",
                open: "",
                close: "",
                claritos: 0,
                corte: 0,
                global: 0,
            })
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['getBranchs'] })
            setTimeout(() => {
                navigate(AppRoutes.branchListAdmin.route());
            }, 1500);
        }
    })

    const initialValues = {
        name: "",
        address: "",
        open: "",
        close: "",
        claritos: 0,
        corte: 0,
        global: 0,
    }


    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: initialValues,
    });



    const prices = data?.prices.reduce((acc, { service, price }) => {
        acc[service] = price;
        return acc;
    }, {} as Record<string, number>);


    useEffect(() => {
        if (data && !hasEdited) {
            reset({
                name: data.name,
                address: data.address,
                open: data.open,
                close: data.close,
                claritos: prices?.claritos || 0,
                corte: prices?.corte || 0,
                global: prices?.global || 0
            });
        }
    }, [data, reset, hasEdited]);

    const handleSubmitForm = (dataForm: formDataCreateBranch) => {
        const data = {
            dataForm: {
                name: dataForm.name,
                address: dataForm.address,
                open: dataForm.open,
                close: dataForm.close,
                prices: [
                    { service: "claritos", price: dataForm.claritos },
                    { service: "corte", price: dataForm.corte },
                    { service: "global", price: dataForm.global }
                ]
            },
            branchId
        }

        mutate(data)
    };


    if (isError) return <h1>falta implementar error</h1>
    if (isLoading) return <LoadingSpinner />;

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Editar Sucursal</PageTitle>
            </PageHeader>
            <PageContent className="flex items-center justify-center mb-20">
                <form
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="bg-white shadow-md max-w-[650px] w-full rounded-md p-7 mt-4"
                >
                    <TitleModal className="mb-4">Editar Sucursal - {data?.name}</TitleModal>
                    <div className="md:flex justify-between gap-3">
                        <div className="my-2 flex-1">
                            <label htmlFor="name" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                                Nombre
                                {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
                            </label>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="text"
                                id="name"
                                placeholder="Ingrese el nombre"
                                {...register('name', { required: "El nombre es obligatorio" })}
                            />
                        </div>
                        <div className="my-2 flex-1">
                            <label htmlFor="address" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                                Dirección
                                {errors.address && <ErrorLabel>{errors.address.message}</ErrorLabel>}
                            </label>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="text"
                                id="address"
                                placeholder="Ingrese la dirección"
                                {...register("address", { required: "Dirección obligatoria" })}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:justify-between gap-3">
                        <div className="my-2 flex-1">
                            <label htmlFor="open" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                                Apertura
                                {errors.open && <ErrorLabel>{errors.open.message}</ErrorLabel>}
                            </label>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="text"
                                id="open"
                                placeholder="Hora de apertura ej: 08:00"
                                {...register("open", { required: "Falta Apertura" })}
                            />
                        </div>
                        <div className="my-2 flex-1">
                            <label htmlFor="close" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                                Cierre
                                {errors.close && <ErrorLabel>{errors.close.message}</ErrorLabel>}
                            </label>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="text"
                                id="close"
                                placeholder="Hora de cierre ej: 19:00"
                                {...register("close", { required: "Falta cierre" })}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="corte" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                            Corte
                            {errors.corte && <ErrorLabel>{errors.corte.message}</ErrorLabel>}
                        </label>
                        <div className="flex gap-1 items-center">
                            <span className="font-bold text-gray-500 pt-2">$</span>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="number"
                                id="corte"
                                placeholder="$ Precio de corte"
                                {...register('corte', {
                                    required: "Precio obligatorio",
                                    valueAsNumber: true,
                                    validate: value => value !== 0 || 'El valor no puede ser 0'
                                })}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="claritos" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                            Claritos
                            {errors.claritos && <ErrorLabel>{errors.claritos.message}</ErrorLabel>}
                        </label>
                        <div className="flex gap-1 items-center">
                            <span className="font-bold text-gray-500 pt-2">$</span>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="number"
                                id="claritos"
                                placeholder="$ Precio de claritos"
                                {...register("claritos", {
                                    required: "Precio obligatorio",
                                    valueAsNumber: true,
                                    validate: value => value !== 0 || 'El valor no puede ser 0'
                                })}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="global" className="uppercase text-gray-600 font-bold flex items-center justify-between">
                            Global
                            {errors.global && <ErrorLabel>{errors.global.message}</ErrorLabel>}
                        </label>
                        <div className="flex gap-1 items-center">
                            <span className="font-bold text-gray-500 pt-2">$</span>
                            <input
                                className="w-full mt-2 p-2 border rounded-md bg-gray-100"
                                type="number"
                                id="global"
                                placeholder="$ Precio de global"
                                {...register('global', {
                                    required: "Precio obligatorio",
                                    valueAsNumber: true,
                                    validate: value => value !== 0 || 'El valor no puede ser 0'
                                })}
                            />
                        </div>
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
                            value="Guardar"
                        />
                    </div>
                </form>
            </PageContent>
        </PageContainer>
    );
}
