import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"; // crud ops on cookies

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public/temp"))
app.use(cookieParser())

// routes
import userRoutes from "./routes/user.js";

// routes declaration
app.use("/api/v1/users", userRoutes)



export { app }