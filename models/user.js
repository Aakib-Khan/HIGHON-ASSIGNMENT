import mongoose, { Schema } from "mongoose";


const coordinateSchema = new Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
});
const userSchema = mongoose.Schema({

    name: { type: String, },
    email: { type: String, },
    password: { type: String, },
    // userLocationCoOrdinates:{ type:Array }   ,
    userCode:{type:String},
    lat: { type: Number },
    lng: { type: Number, }
    ,

    date: { type: Date, default: Date.now() },



},
    {
        versionKey: false
    },
)
export default mongoose.model('User', userSchema);
