export const appointmentStatus = {
    booked: 'booked',
    canceled: 'canceled',
    completed: 'completed',
    available: 'available'
} as const

export type AppointmentStatus = (typeof appointmentStatus)[keyof typeof appointmentStatus];