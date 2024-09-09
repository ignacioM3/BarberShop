import { PropsWithChildren } from "react";
import { UserRole } from "../types/use-role";
import { Navigate } from "react-router-dom";

export interface AuthGuardProps {
    redirectPath?: string;
    allowedRoles?: UserRole[];
}
export function AuthGuard({
    redirectPath,
    allowedRoles,
    children,
}: PropsWithChildren<AuthGuardProps>) {
    const currentUser = {
        role: UserRole.ADMIN
    }
    if (
        currentUser &&
        allowedRoles &&
        !allowedRoles.includes(currentUser.role)
    ) {
        return <Navigate to="/unauthorized" />;
    }

    return <>{children}</>;
}
