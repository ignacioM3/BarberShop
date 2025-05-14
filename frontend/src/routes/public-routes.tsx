import { UserRole } from '../types/use-role'

const appLayoutImport = async () =>
    (await import('../layout/AuthLayout')).AuthLayout

export const publicRoutes = {
    home: {
        route: () => "/",
        page: async () => (await import('../pages/Home')).Home,
        layout: appLayoutImport
    },
    profile: {
        route: () => "/profile",
        page: async () => (await import('../pages/home/Profile')).Profile,
        requiresAuth: true,
        allowedRoles: [UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT],
        layout: appLayoutImport
    },
    about: {
        route: () => "/about",
        page: async () => (await import('../pages/home/About')).About,
        layout: appLayoutImport
    },
    aboutBranch: {
        route: () => "/about-branch",
        page: async () => (await import('../pages/home/AboutBranch')).AboutBranch,
        layout: appLayoutImport
    },
    price: {
        route: () => "/price",
        page: async () => (await import('../pages/home/Price')).Price,
        layout: appLayoutImport
    }
}