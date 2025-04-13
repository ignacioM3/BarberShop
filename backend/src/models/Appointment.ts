import mongoose, {Document,  Schema, Types } from "mongoose";
import { AppointmentStatus, appointmentStatus } from "./AppointmentStatus";
import { ServiceType, serviceType } from "./Service";

export interface IAppointment extends Document{
    userId?: Types.ObjectId;
    name?: string;
    branchId: Types.ObjectId;
    barberId: Types.ObjectId;
    timeSlot: string;
    status: AppointmentStatus;
    details: string;
    day: string;
    manual: boolean;
    instagram?: string;
    whatsapp?: number;
    service: ServiceType;
    price: number;
}

export const appointmentSchema: Schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
    }, 
    manual: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
    },
    barberId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    branchId: {
        type: Types.ObjectId,
        ref: 'Branch'
    },
    day: {
        required: true,
        type: String
    },
    timeSlot: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String,
        enum: Object.values(appointmentStatus)
    },
    details: {
        type: String,
    },
    instagram: {
        type: String,
    },
    whatsapp: {
        type: Number,
    },
    service: {
        type: String,
        required: true,
        enum: Object.values(serviceType)
    },
    price: {
        type: Number,
        required: true,
    }
})

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;