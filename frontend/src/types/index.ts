import { z } from 'zod';
import { UserRole } from './use-role';

// --- Auth Schema ---
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  confirmed: z.boolean(),
  role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

// --- Auth Form Types ---
export type UserRegistrationForm = Pick<Auth, 'email' | 'name' | 'password' | 'password_confirmation'>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserLogged = Pick<Auth, 'email' | 'name' | 'role'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'password_confirmation'>;

// --- Branch Schema ---
export const branchSchema = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string(),
  barbers: z.array(
   z.object({
    _id: z.string(),
    name: z.string()
   })
  ),
});

// --- Barber Schema ---
export const barberSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  confirmed: z.boolean(),
  role: z.string(),
  branch: branchSchema.optional(),
});

// --- User Schema ---
const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  confirmed: z.boolean(),
  haircuts: z.number(),
  instagram: z.string().optional(),
  number: z.number().optional(),
  password: z.string(),
  role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const),
});

export type User = z.infer<typeof userSchema>;

// --- User Form Types ---
export type UserListType = Pick<User, 'email' | 'name' | 'confirmed' | 'role' | '_id' | 'haircuts' | 'instagram' | 'number'>;
export type UserCreateForm = Pick<User, 'name' | 'email' | 'password'>;

export type UserBarberListType = {
  _id: string;
  name: string;
  role: string;
  confirmed: boolean;
  branch?: {
    _id: string;
    name: string;
  };
};

// --- Get User List Schema ---
export const getUserListSchema = z.object({
  users: z.array(userSchema),
  totalUsers: z.number(),
});

// --- Get Barber List Schema ---
export const getBarberListSchema = z.object({
  users: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      confirmed: z.boolean(),
      role: z.enum([UserRole.ADMIN, UserRole.BARBER, UserRole.CLIENT] as const),
      branch: z
        .object({
          _id: z.string(),
          name: z.string(),
          address: z.string(),
        })
        .optional(),
    })
  ),
  totalUsers: z.number(),
});


// --- Get Branch List Schema ---
export const getBranchListSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    address: z.string(),
    barbers: z.array(
       z.object({
        _id: z.string(),
        name: z.string()
       })
    ),
  })
)

//Type for branch
export type Branch = z.infer<typeof branchSchema>;

export type BranchListType = Pick<Branch, '_id' | 'address' | 'name' | 'barbers'>