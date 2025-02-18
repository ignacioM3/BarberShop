export const serviceType = {
    haircut: "corte",
    global: "global",
    fullColor: "claritos"
} as const 

export type ServiceType = (typeof serviceType)[keyof typeof serviceType];