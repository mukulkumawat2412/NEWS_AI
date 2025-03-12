import mongoose from "mongoose"


 const newsSummarySchema = new mongoose.Schema({
    url:{type:String,required:true,unique:true},

    summary:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()}



})




const NewsSummary = mongoose.model("NewsSummary",newsSummarySchema)

export default NewsSummary;