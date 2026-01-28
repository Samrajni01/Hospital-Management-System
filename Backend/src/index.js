import dotenv from "dotenv"
import connectDB from './db/config.js'
import { app } from "./app.js"
dotenv.config({
    path: '../.env'
})




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























