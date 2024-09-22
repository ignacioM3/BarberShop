import {z} from 'zod'
import { UserRole } from './use-role';

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const)
})

type Auth = z.infer<typeof authSchema>;
export type UserRegistrationForm = Pick<Auth, 'email' | 'name' | 'password' | 'password_confirmation'>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserLogged = Pick<Auth, 'email' | 'name' | 'role'>