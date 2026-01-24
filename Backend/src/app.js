import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();


app.use(cors({
    origin://process.env.CORS_ORIGIN
    true
    ,
    credentials:true
}))

app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))



import userRouter from "./routes/user.routes.js";
import doctorRouter from "./routes/doctor.route.js";
import patientRouter from "./routes/patient.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import reportRouter from "./routes/report.route.js";
import billRouter from "./routes/bill.route.js";

app.use("/api/v1/users",userRouter)
app.use("/api/v1/doctors",doctorRouter)
app.use("/api/v1/patients",patientRouter)
app.use("/api/v1/appointments",appointmentRouter)
app.use("/api/v1/reports",reportRouter)
app.use("/api/v1/bill",billRouter)



export { app }