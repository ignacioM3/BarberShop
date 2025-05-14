import { UserRole } from '../types/use-role';

const adminLayoutImport = async () =>
    (await import('../layout/AdminLayout')).AdminLayout


export const adminRoutes = {
    homeAdmin: {
        route: () => "/admin/dashboard",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('../pages/admin/HomeAdmin')).HomeAdmin,
        layout: adminLayoutImport
    },
    userListAdmin: {
        route: () => "/admin/users",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import ('../pages/admin/user/UserList')).UserList,
        layout: adminLayoutImport
    },
    barberListAdmin: {
        route: () => "/admin/barber",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/barber/BarberList')).BarberList,
        layout: adminLayoutImport
    },
    createBarberAdmin: {
        route: () => "/admin/barber/create",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/barber/CreateBarber')).CreateBarber,
        layout: adminLayoutImport
    },
    editBarberAdmin: {
        route:(id?: string) => `/admin/barber/${id ?? ":id"}/edit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/barber/EditBarber')).EditBarber,
        layout: adminLayoutImport
    },
    branchListAdmin: {
        route: () => "/admin/branch",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/branch/BranchList')).BranchList,
        layout: adminLayoutImport
    },
    createBranchAdmin: {
        route: () => "/admin/create-branch",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await (import('../pages/admin/branch/CreateBranch'))).CreateBranch,
        layout: adminLayoutImport
    },
    editBranchAdmin: {
        route: (id? : string) => `/admin/branch/${id?? ":id"}/edit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/branch/EditBranch')).EditBranch,
        layout: adminLayoutImport
    },
    AddBarberToBranchAdmin: {
        route: (id? : string) => `/admin/branch/${id?? ":id"}/add-barber`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/branch/AddBarberToBranch')).AddBarberToBranch,
        layout: adminLayoutImport
    },
    Appointment: {
        route: () => `/admin/appointment`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('../pages/admin/appointment/Appointment')).Appointment,
        layout: adminLayoutImport
    },
    AppointmentToday:{
        route: (id?: string) => `/admin/appointment/${id?? ":id"}/today`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('../pages/admin/appointment/AppointmentToday')).AppointmentToday,
        layout: adminLayoutImport
    },
    AppointmentWeek: {
        route: (id?: string) => `/admin/appointment/${id?? ":id"}/week`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('../pages/admin/appointment/AppointmentWeek')).AppointmentWeek,
        layout: adminLayoutImport
    },
    AppointmentWeekDay: {
        route: (day?:string, id?:string) => `/admin/appointment/${id?? ":id"}/week/${day?? ":day"}`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER],
        page: async () => (await import('../pages/admin/appointment/AppointmentWeekDay')).AppointmentWeekDay,
        layout: adminLayoutImport
    },
    ProfitHome: {
        route: () => `/admin/profit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/profit/ProfitPage')).ProfitPage,
        layout: adminLayoutImport
    },
    createUserAdmin: {
        route: () => "/admin/user/create",
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/user/CreateUser')).CreateUser,
        layout: adminLayoutImport   
    },
    editUSerAdming: {
        route: (id?: string) => `/admin/user/${id?? ":id"}/edit`,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN],
        page: async () => (await import('../pages/admin/user/EditUser')).EditUser,
        layout: adminLayoutImport 
    }
}