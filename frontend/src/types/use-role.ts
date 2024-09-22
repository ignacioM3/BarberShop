export const UserRole = {
    ADMIN: 'Admin',
    BARBER: 'Barber',
    CLIENT: 'Client'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole];