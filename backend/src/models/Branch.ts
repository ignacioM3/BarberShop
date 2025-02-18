import mongoose, { Schema, Types, Document } from 'mongoose'
import { ServiceType, serviceType } from './Service';

export interface IBranch extends Document{
    barbers: Types.ObjectId[];
    name: string;
    address: string;
    open: string,   
    close: string,
    prices: [{service: ServiceType;  price: number}]
}

const branchSchema: Schema = new Schema({
    barbers: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        required: true
    },
    address: {
        type: String, 
        required: true,
    },
    open: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, 
    },
    close: {
        type: String,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    prices: [
        {
            _id: false,
            service: {
                type: String,
                enum: Object.values(serviceType),
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
})

const Branch = mongoose.model<IBranch>('Branch', branchSchema);
export default Branch