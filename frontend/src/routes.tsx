import { UserRole } from './types/use-role';
import { RouterDefinition } from './routes/router-definition'

const appLayoutImport = async () =>
    (await import('./layout/AuthLayout')).AuthLayout
const adminLayoutImport = async () =>
    (await import('./layout/AdminLayout')).AdminLayout

export const AppRoutes = {
    home: {
        route: () => "/",
        page: async () => (await import('./pages/Home')).Home,
        layout: appLayoutImport
    },
    error: {
        route: () => "*",
        redirect: "/"
    },
    register: {
        route: () => "/auth/register",
        page: async () => (await import('./pages/auth/Register')).default,
        layout: appLayoutImport
    },
    login: {
        route: () => "/auth/login",
        page: async () => (await import('./pages/auth/Login')).default,
        layout: appLayoutImport
    },
    confirmAccount: {
        route: () => "/auth/confirm-account",
        page: async () => (await import('./pages/auth/ConfirmAccount')).ConfirmAccount,
        layout: appLayoutImport
    },
    requestConfirmationCode: {
        route: () => "/auth/request-code",
        page: async () => (await import('./pages/auth/RequestConfirmationCode')).RequestConfirmationCode,
        layout: appLayoutImport
    },
    forgotPassword: {
        route: () => "/auth/forgot-password",
        page: async () => (await import('./pages/auth/ForgoPassword')).ForgoPassword,
        layout: appLayoutImport
    },
    newPassword: {
        route: () => "/auth/new-password",
        page: async () => (await import('./pages/auth/NewPassword')).NewPassword,
        layout: appLayoutImport
    },
    //admin pages
    homeAdmin: {
        route: () => "/admin/dashboard",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/HomeAdmin')).HomeAdmin,
        layout: adminLayoutImport
    },
    userListAdmin: {
        route: () => "/admin/users",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import ('./pages/admin/UserList')).UserList,
        layout: adminLayoutImport
    },
    barberListAdmin: {
        route: () => "/admin/barber",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/BarberList')).BarberList,
        layout: adminLayoutImport
    },
    branchListAdmin: {
        route: () => "/admin/branch",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/BranchList')).BranchList,
        layout: adminLayoutImport
    },
    AddBarberToBranchAdmin: {
        route: (id? : string) => `/admin/branch/${id?? ":id"}/add-barber`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/AddBarberToBranch')).AddBarberToBranch,
        layout: adminLayoutImport
    },
    Appointment: {
        route: () => `/admin/appointment`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/Appointment')).Appointment,
        layout: adminLayoutImport
    },
    AppointmentToday:{
        route: () => `/admin/appointment/today`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/AppointmentToday')).AppointmentToday,
        layout: adminLayoutImport
    }

} as const satisfies Record<string, RouterDefinition>;
export type Routes = keyof typeof AppRoutes;


export const routeList: RouterDefinition[] = Object.values(AppRoutes);
