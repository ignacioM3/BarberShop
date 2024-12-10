import mongoose, {Document,  Schema, Types } from "mongoose";

export interface IAppointment extends Document{
    userId?: Types.ObjectId;
    branchesId: Types.ObjectId;
    barberId: Types.ObjectId;
    timeSlot: Date;
    status: string;
    day: Date;
}

export const appointmentSchema: Schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
    }, 
    barberId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    branchesId: {
        type: Types.ObjectId,
        ref: 'Branch'
    },
    day: {
        required: true,
        type: Date
    },
    timeSlot: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String,
        enum: ['available', "booked", "canceled"]
    }
    
})

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;