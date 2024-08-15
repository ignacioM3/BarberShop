export const userRole = {
    admin: 'Admin',
    client: 'Client',
    barber: 'Barber'
} as const;


export type UserRole = (typeof userRole)[keyof typeof userRole]