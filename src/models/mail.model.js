import mongoose, { Schema } from "mongoose"


const mailSchema = new Schema({
  trackingId:{
    type:String,
    required:true
  },
  opens:{
    type:Number,
    default:0
  },
  userIPs:{
    type:Array,
    default:[]
  }
})

export const Mail = mongoose.model("Mail" , mailSchema)