import dotenv from "dotenv"
import connectDB from './db/config.js'
import { app } from "./app.js"
dotenv.config({
    path: '../.env'
})
//mongodb+srv://samrajni09:Nm37QU5%23q2HwN9_@cluster0.mkccqlm.mongodb.net



connectDB()
.then(()=>{


    app.on("error",(error)=>{
            console.log("ERROR",error);

          throw error;  
           
         })
    app.listen(process.env.PORT || 9000 , ()=>{
        
        console.log(`server is running at port :${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB connectiom failed!!!",error);
    
})























