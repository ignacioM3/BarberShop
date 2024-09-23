import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UserLogged, UserLoginForm, UserRegistrationForm } from "../types";

    

export async function createAccountApi(formData: UserRegistrationForm) {
    try {
        const url = `/auth/create-account`;
        const {data} = await api.post<string>(url, formData)
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function authLogin(
    formData: UserLoginForm,
    setCurrentUser: (user: UserLogged) => void
){
    try {
        const url = '/auth/login';
        const {data} = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data}`,
            },
        };

        const { data: userData } = await api.get<UserLogged>('/auth/user/perfil', config);
        setCurrentUser(userData);

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}