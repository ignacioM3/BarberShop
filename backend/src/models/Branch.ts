import mongoose, { Schema, Types, Document } from 'mongoose'

export interface IBranch extends Document{
    barbers: Types.ObjectId[];
    name: string;
    address: string;
    open: string,   
    close: string,
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
    }
})

const Branch = mongoose.model<IBranch>('Branch', branchSchema);
export default Branch