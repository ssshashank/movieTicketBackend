require("dotenv").config();
const mongoose=require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes=mongoose.Schema.Types;
const UserAccounts=require("./userAccount");
const movies=require("./movie");


const theatre=mongoose.Schema({
    theatreId:{
        type:SchemaTypes.ObjectId,
        immutable:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    area:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:String,
        required:true,
        trim:true
    },
    totalSeats:[
        {
            type:Number,
            required:true,
            trim:true
        }
    ],
    seatsFilled:[
        {
            type:Number,
            trim:true
        }
    ],
    movieName: [
        {
            type:String,
            trim:true
        }
    ],
    timing:[
        {
            type:String,
            trim:true
        }
    ]
},{
    timestamps:true
})

theatre.methods.toJSON=function(){
    try {
        const theatre=this;
        const theatreObject=theatre.toObject()
        return theatreObject
    } catch (error) {
        return error
    }
}
module.exports=mongoose.model('theatre',theatre)