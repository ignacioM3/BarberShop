import mongoose, {Document,  Schema, Types } from "mongoose";

export interface IAppointment extends Document{
    userId?: Types.ObjectId;
    name?: string;
    branchId: Types.ObjectId;
    barberId: Types.ObjectId;
    timeSlot: string;
    status: string;
    details: string
    day: string;
    manual: boolean;
}

export const appointmentSchema: Schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
    }, 
    manual: {
        type: Boolean,
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
        enum: ['available', "booked", "canceled"]
    },
    details: {
        type: String,
    }
})

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;