require('dotenv').config();
const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const UserAccounts=require("./userAccounts");

const movie=mongoose.Schema({
    movieId:{
        type: SchemaTypes.ObjectId,
        immutable: true,
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    genre:{
        type: String,
        required: true,
        trim: true
    },
    imageUrl:{
        type: String,
        trim: true
    },
    description:{
        type: String,
        trim: true
    }
},{
    timestamps: true,
})
movie.methods.toJSON=function(){
    try {
        const movie=this;
        const movieObject=movie.toObject()
        return movieObject
    } catch (error) {
        return error
    }
}

module.exports=mongoose.model('movies',movies);