import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { UserRole, userRole } from "./RoleUser";
import { IBranch } from "./Branch";

export interface IUser extends Document{
    email: string,
    password: string,
    name: string,
    address?: string,
    confirmed: boolean,
    role: UserRole,
    haircuts: number,
    number?: number,
    blocked: boolean,
    instagram?: string,
    branch: PopulatedDoc<IBranch & Document>
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
    address: {
        type: String,
        required: false
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
    blocked: {
        default: false,
        type: Boolean,
    },
    haircuts: {
        type: Number,
        default: 0,
    },
    number: {
        type: Number,
        default: undefined
    },
    branch: {
        type: Types.ObjectId,
        ref: 'Branch'
    }
})


const User = mongoose.model<IUser>('User', userSchema)
export default User;