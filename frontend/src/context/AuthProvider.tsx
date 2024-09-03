import { createContext, useState } from "react";

interface AuthContextType{
    user: string
    setUser: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<AuthContextType>({
    user: '',
    setUser: () => {}
});

const AuthProvider =({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<string>('')
    
    return (
        <AuthContext.Provider 
            value={{
                user,
                setUser
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