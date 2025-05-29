import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const conIns = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n MongoDb connected, HOST: ${conIns.connection.host}`);
    } catch (error) {
        console.log("MONGOBD connection ERROR: ", error);
        process.exit(1);
    }
}

export default connectDB;
