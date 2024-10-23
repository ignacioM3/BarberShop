import mongoose, { Document, Schema } from "mongoose";
import { UserRole, userRole } from "./RoleUser";

export interface IUser extends Document{
    email: string,
    password: string,
    name: string,
    confirmed: boolean,
    role: UserRole,
    haircuts: number,
    number: number,
    instagram: string
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dni: {
        type: String,
    },
    instagram: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        default: userRole.client,
        type: String,
        enum: Object.values(userRole)
    },
    haircuts: {
        type: Number,
        default: 0,
    },
    number: {
        type: Number,
    }
})


const User = mongoose.model<IUser>('User', userSchema)
export default User;