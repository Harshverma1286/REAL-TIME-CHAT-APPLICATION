import mongoose from "mongoose";

const messageschema = new mongoose.Schema(
    {
        senderid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        reciverid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
        }
    },
    {
        timestamps:true
    }
);

const message = mongoose.model("Message",messageschema);

export default message;