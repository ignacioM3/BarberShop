import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { AppRoutes } from "../routes";
import { UserLogged } from "../types";

// 1. Tipo del contexto
interface AuthContextType {
    currentUser?: UserLogged;
    loading: boolean;
    refetchUser: () => void;
    logoutUser: () => void;
}

// 2. Contexto inicial
const AuthContext = createContext<AuthContextType>({
    currentUser: undefined,
    loading: true,
    refetchUser: () => {},
    logoutUser: () => {}
});

// 3. Función que busca el perfil del usuario
const fetchCurrentUser = async (): Promise<UserLogged> => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (!token) throw new Error("No token");

    const { data } = await api.get<UserLogged>('/auth/user/perfil', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    return data;
};

// 4. Provider
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const {
        data: currentUser,
        isLoading: loading,
        refetch: refetchUser
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        enabled: !!localStorage.getItem('AUTH_TOKEN'),
        retry: false, // evita reintentar si no hay token
    });

    const logoutUser = () => {
        localStorage.removeItem("AUTH_TOKEN");
        refetchUser(); // opcional: limpia cache
        navigate(AppRoutes.home.route());
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                refetchUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export {
    AuthProvider
};

export default AuthContext;
