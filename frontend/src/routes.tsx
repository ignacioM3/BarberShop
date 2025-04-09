import { UserRole } from './types/use-role';
import { RouterDefinition } from './routes/router-definition'
import { AboutBranch } from './pages/home/AboutBranch';

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
    about: {
        route: () => "/about",
        page: async () => (await import('./pages/home/About')).About,
        layout: appLayoutImport
    },
    aboutBranch: {
        route: () => "/about-branch",
        page: async () => (await import('./pages/home/AboutBranch')).AboutBranch,
        layout: appLayoutImport
    },
    price: {
        route: () => "/price",
        page: async () => (await import('./pages/home/Price')).Price,
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
    selectBranchAppointment: {
        route: () => "/appointment/branch",
        page: async () => (await import('./pages/appointment/SelectBranchAppointment')).SelectBranchAppointment,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    selectTimeAppointment: {
        route: (id?: string) => `/apointment/branch/${id?? ':id'}/time`,
        page: async () => (await import('./pages/appointment/SelecetTime')).SelecetTime,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    selectBarberAppointment: {
        route: (id?: string) => `/appointment/branch/${id?? ':id'}/barber`,
        page: async () => (await import('./pages/appointment/SelectBarber')).SelectBarber,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    resumenAppointment: {
        route: (id?: string) => `/appointment/branch/${id?? ':id'}/resumen`,
        page: async () => (await import('./pages/appointment/ResumenAppointment')).ResumenAppointment,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
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
        page: async () => (await import ('./pages/admin/user/UserList')).UserList,
        layout: adminLayoutImport
    },
    barberListAdmin: {
        route: () => "/admin/barber",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/barber/BarberList')).BarberList,
        layout: adminLayoutImport
    },
    createBarberAdmin: {
        route: () => "/admin/barber/create",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/barber/CreateBarber')).CreateBarber,
        layout: adminLayoutImport
    },
    editBarberAdmin: {
        route:(id?: string) => `/admin/barber/${id ?? ":id"}/edit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/barber/EditBarber')).EditBarber,
        layout: adminLayoutImport
    },
    branchListAdmin: {
        route: () => "/admin/branch",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/branch/BranchList')).BranchList,
        layout: adminLayoutImport
    },
    createBranchAdmin: {
        route: () => "/admin/create-branch",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await (import('./pages/admin/branch/CreateBranch'))).CreateBranch,
        layout: adminLayoutImport
    },
    editBranchAdmin: {
        route: (id? : string) => `/admin/branch/${id?? ":id"}/edit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/branch/EditBranch')).EditBranch,
        layout: adminLayoutImport
    },
    AddBarberToBranchAdmin: {
        route: (id? : string) => `/admin/branch/${id?? ":id"}/add-barber`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/branch/AddBarberToBranch')).AddBarberToBranch,
        layout: adminLayoutImport
    },
    Appointment: {
        route: () => `/admin/appointment`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/appointment/Appointment')).Appointment,
        layout: adminLayoutImport
    },
    AppointmentToday:{
        route: (id?: string) => `/admin/appointment/${id?? ":id"}/today`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/appointment/AppointmentToday')).AppointmentToday,
        layout: adminLayoutImport
    },
    AppointmentWeek: {
        route: (id?: string) => `/admin/appointment/${id?? ":id"}/week`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/appointment/AppointmentWeek')).AppointmentWeek,
        layout: adminLayoutImport
    },
    AppointmentWeekDay: {
        route: (day?:string, id?:string) => `/admin/appointment/${id?? ":id"}/week/${day?? ":day"}`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('./pages/admin/appointment/AppointmentWeekDay')).AppointmentWeekDay,
        layout: adminLayoutImport
    },
    ProfitHome: {
        route: () => `/admin/profit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/profit/ProfitPage')).ProfitPage,
        layout: adminLayoutImport
    },
    createUserAdmin: {
        route: () => "/admin/user/create",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/user/CreateUser')).CreateUser,
        layout: adminLayoutImport   
    },
    editUSerAdming: {
        route: (id?: string) => `/admin/user/${id?? ":id"}/edit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('./pages/admin/user/EditUser')).EditUser,
        layout: adminLayoutImport 
    }

} as const satisfies Record<string, RouterDefinition>;
export type Routes = keyof typeof AppRoutes;


export const routeList: RouterDefinition[] = Object.values(AppRoutes);
