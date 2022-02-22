require('dotenv').config();
const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const bcrypt = require('bcryptjs');
const SchemaTypes = mongoose.Schema.Types;

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