import { FunctionComponent, PropsWithChildren } from "react";
import { UserRole } from "../types/use-role";

export interface RouterDefinition{
    route: (...args: string[]) => string;
    layout?: () => Promise<FunctionComponent>;
    page?: () => Promise<FunctionComponent<PropsWithChildren>>;
    requiresAuth?: boolean;
    allowedRoles?: UserRole[];
    redirect?: string
}