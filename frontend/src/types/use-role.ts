export const UserRole = {
    ADMIN: 'admin',
    BARBER: 'barber',
    CLIENT: 'client'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole];