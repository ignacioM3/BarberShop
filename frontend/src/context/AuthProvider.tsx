import { createContext, useEffect, useState } from "react";
import { UserLogged } from "../types";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes";


interface AuthContextType{
    currentUser?: UserLogged ;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserLogged | undefined>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    logoutUser: () => void;
    
}

const AuthContext = createContext<AuthContextType>({
    currentUser: undefined,
    setCurrentUser: () => {},
    loading: true,
    setLoading: () => {},
    logoutUser: () => {}
});

const AuthProvider =({children}: {children: React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<UserLogged | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate()

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('AUTH_TOKEN')
            if(!token){
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await api.get<UserLogged>('/auth/user/perfil', config);
                setCurrentUser(data)

            } catch (error) {
                setCurrentUser(undefined)
            }

            setLoading(false)
        }

        authenticateUser()
    }, [])

    const logoutUser = () => {
        setCurrentUser(undefined)
        localStorage.removeItem("AUTH_TOKEN");
        navigate(AppRoutes.home.route())
    }

    return (
        <AuthContext.Provider 
            value={{
                currentUser,
                setCurrentUser,
                loading,
                setLoading,
                logoutUser
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext 