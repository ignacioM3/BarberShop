export const AppointmentStatus = {
    AVAILABLE: 'available',
    BOOKED: 'booked',
    CANCELED: 'canceled',
    COMPLETED: 'completed'
} as const 

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];