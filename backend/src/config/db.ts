import { exit } from "node:process";
import mongoose from 'mongoose';
import colors from 'colors'

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}: ${connection.port}`;
        console.log(colors.magenta.bold(`MongoDB connect to ${url}`));
    } catch (error) {
        console.log(colors.red.bold(error.message));
        exit(1)
    }
}