import mongoose, { Document, Schema } from "mongoose";
import { UserRole, userRole } from "./RoleUser";

export interface IUser extends Document{
    email: string,
    password: string,
    name: string,
    confirmed: boolean,
    role: UserRole
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
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        default: userRole.client,
        type: String,
        enum: Object.values(userRole)
    }
})


const User = mongoose.model<IUser>('User', userSchema)
export default User;