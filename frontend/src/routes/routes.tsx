import { RouterDefinition } from './router-definition'

const appLayoutImport = async () => 
    (await import('../layout/AuthLayout')).AuthLayout

export const AppRoutes = {
    home: {
        route: () => "/",
        redirect: "/auth/register"
    },
    error: {
        route: () => "*",
        redirect: "/"
    },
    register: {
        route: () => "/auth/register",
        page: async () => (await import('../pages/auth/Register')).default,
        layout: appLayoutImport
    },
    login: {
        route: () => "/auth/login",
        page: async () => (await import('../pages/auth/Login')).default,
        layout: appLayoutImport
    },
    confirmAccount: {
        route: () => "/auth/confirm-account",
        page: async () => (await import('../pages/auth/ConfirmAccount')).ConfirmAccount,
        layout: appLayoutImport
    },
    requestConfirmationCode: {
        route: () => "/auth/request-code",
        page: async () => (await import('../pages/auth/RequestConfirmationCode')).RequestConfirmationCode,
        layout: appLayoutImport
    },
    forgotPassword: {
        route: () => "/auth/forgot-password",
        page: async () => (await import('../pages/auth/ForgoPassword')).ForgoPassword,
        layout: appLayoutImport
    }
    
} as const satisfies Record<string, RouterDefinition>;
export type Routes = keyof typeof AppRoutes;


export const routeList: RouterDefinition[] = Object.values(AppRoutes);
