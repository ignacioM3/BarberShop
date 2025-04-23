import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updateProfileUserApi } from "../../../api/UserApi";
import { useEffect, useState } from "react";

interface formType {
    instagram: string,
    number: number | undefined,
    address: string,
}

export default function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const show = queryParams.get("editUser") === 'true' ? true : false;
    const [newInfo, setNewInfo] = useState<formType>();
    const { currentUser, setCurrentUser } = useAuth();

    const { mutate } = useMutation({
        mutationFn: updateProfileUserApi,
        onSuccess: (data) => {
            closeDetails();
            toast.success(data)
            setCurrentUser({
                ...currentUser!,
                instagram: newInfo?.instagram ?? "",
                number: newInfo?.number ?? undefined,
                address: newInfo?.address ?? ""
            });
        },
        onError: (error) => {
            toast.error(error.message)
        }

    })


    const { register, handleSubmit, reset } = useForm({
        defaultValues:  {
            address: currentUser?.address || "",
            number: currentUser?.number || undefined,
            instagram: currentUser?.instagram || "",
        }
    })

    useEffect(() => {
        if (currentUser) {
            reset({
                address: currentUser.address || "",
                number: currentUser.number || undefined,
                instagram: currentUser.instagram || ""
            });
        }
    }, [currentUser, reset]);

    const closeDetails = () => {
        navigate(location.pathname, { replace: true })
    }

    const handleEditProfile = (formData: formType) => {
        const data = {
            ...formData,
            _id: currentUser?._id!,
            number: Number(formData.number)
        }
        setNewInfo({
            instagram: formData.instagram,
            number: Number(formData.number),
            address: formData.address
        })
        mutate(data)
    }

    return (
        <div
            className={`${show ? "fixed" : "hidden"} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0`}
            onClick={closeDetails}
            onSubmit={handleSubmit(handleEditProfile)}
        >
            <div className="w-full h-full flex items-center justify-center">
                <form
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#ae9961] w-[350px]  md:w-[400px] shadow-md rounded-md px-7 py-4 mt-8 mx-4 md:mt-4"
                >
                    <h1 className="text-center md:text-2xl font-mono font-bold text-gray-700 border-b border-b-gray-700">Mi Información</h1>
                    <div className="my-2">
                        <label
                            htmlFor="instagram"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >Instagram</label>
                        <input
                            type="text"
                            id="instagram"
                            {...register('instagram')}
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el Instagram"
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="number"
                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >Whatsapp</label>
                        <input
                            type="number"
                            id="number"
                            {...register('number')}
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa el whatsapp"
                        />
                    </div>
                    <div className="my-2">
                        <label
                            htmlFor="address"

                            className="uppercase text-gray-600 font-bold flex justify-between items-center"
                        >Dirreción</label>
                        <input
                            type="text"
                            id="address"
                            {...register('address')}
                            className="w-full mt-2 py-1 px-2 border rounded-md bg-gray-100"
                            placeholder="Ingresa tú dirección"
                        />
                    </div>

                    <div className="flex gap-4 mt-4">

                        <input
                            type="button"
                            value="Cancelar"
                            onClick={closeDetails}
                            className="bg-red-500 w-full py-2 mb-2 text-sm text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-red-600 transition-colors"
                        />
                        <input
                            type="submit"
                            className="bg-green-500 w-full text-sm py-2 mb-2 text-gray-100 uppercase font-bold rounded cursor-pointer hover:bg-green-600 transition-colors"
                            value="Guardar"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
