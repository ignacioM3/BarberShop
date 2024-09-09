import { RouterDefinition } from './router-definition'

const appLayoutImport = async () => 
    (await import('../layout/AuthLayout')).AuthLayout

export const AppRoutes = {
    register: {
        route: () => "/auth/register",
        page: async () => (await import('../pages/Register')).default,
        layout: appLayoutImport
    }
} as const satisfies Record<string, RouterDefinition>;
export type Routes = keyof typeof AppRoutes;


export const routeList: RouterDefinition[] = Object.values(AppRoutes);
