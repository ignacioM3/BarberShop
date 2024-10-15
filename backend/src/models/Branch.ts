import mongoose, { Schema, Types, Document } from 'mongoose'




export interface IBranch extends Document{
    barbers: Types.ObjectId[];
    name: string;
    address: string;
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
    }
})

const Branch = mongoose.model<IBranch>('Branch', branchSchema);
export default Branch