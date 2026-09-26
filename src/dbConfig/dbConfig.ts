import mongoose from "mongoose";

export async function  connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection
        
        connection.on("connected",()=>{
            console.log("mongoodb Connected")
        })

        connection.on("error",(err:any)=>{
            console.log("DB connection error" +err)
            process.exit(1)
        })
    } 
    catch (error:any) {
        console.log("DB is not connection",error?.message)    
    }
}