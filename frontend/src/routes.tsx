import { RouterDefinition } from './routes/router-definition'
import { adminRoutes } from './routes/admin-routes';
import { publicRoutes } from './routes/public-routes';
import { appointmentRoutes } from './routes/appointment-routes';
import { authRoutes } from './routes/auth-routes';

export const AppRoutes = {
    ...publicRoutes,
    ...authRoutes,
    ...appointmentRoutes,
    ...adminRoutes,
    error: {
        route: () => "*",
        redirect: "/"
    }

} as const satisfies Record<string, RouterDefinition>;
export type Routes = keyof typeof AppRoutes;


export const routeList: RouterDefinition[] = Object.values(AppRoutes);
