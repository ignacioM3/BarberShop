import { PropsWithChildren } from "react";
import { UserRole } from "../types/use-role";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export interface AuthGuardProps {
    redirectPath?: string;
    allowedRoles?: UserRole[];
}
export function AuthGuard({
    redirectPath,
    allowedRoles,
    children,
}: PropsWithChildren<AuthGuardProps>) {
    const {currentUser} = useAuth()
    
    if (
        currentUser &&
        allowedRoles &&
        !allowedRoles.includes(currentUser.role)
    ) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
}
