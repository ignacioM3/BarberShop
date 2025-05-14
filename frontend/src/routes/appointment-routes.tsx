import { UserRole } from '../types/use-role';

const appLayoutImport = async () =>
    (await import('../layout/AuthLayout')).AuthLayout


export const appointmentRoutes = {
    selectBranchAppointment: {
        route: () => "/appointment/branch",
        page: async () => (await import('../pages/appointment/SelectBranchAppointment')).SelectBranchAppointment,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    selectTimeAppointment: {
        route: (id?: string) => `/apointment/branch/${id?? ':id'}/time`,
        page: async () => (await import('../pages/appointment/SelecetTime')).SelecetTime,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    selectBarberAppointment: {
        route: (id?: string) => `/appointment/branch/${id?? ':id'}/barber`,
        page: async () => (await import('../pages/appointment/SelectBarber')).SelectBarber,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    resumenAppointment: {
        route: (id?: string) => `/appointment/branch/${id?? ':id'}/resumen`,
        page: async () => (await import('../pages/appointment/ResumenAppointment')).ResumenAppointment,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
}