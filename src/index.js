
import dotenv from 'dotenv';

import connectDB from "./db/db.js";
import { app } from './app.js';

dotenv.config({
    path: '\.env'
})

connectDB()

.then(() => {

    app.on("error", (error) => {            // fsdjfnjsdn
        console.log("ERRR : ", error);
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})

.catch((err) => {
    console.log("MONGO db Connection Fail", err);
})