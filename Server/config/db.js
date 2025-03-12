import mongoose from "mongoose"







 const dbConnect = async()=>{
    try {
        const connection =   await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb Connected")
        
    } catch (error) {
        // console.log(error)
    }


}



export default dbConnect;