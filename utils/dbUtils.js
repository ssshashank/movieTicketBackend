require('dotenv').config();
const mongoose=require("mongoose");
const userAccount=require("../models/userAccount");
const movie=require("../models/movie");
const theatre=require("../models/theatre");


const dbUtils={
    dbInit:function(){
        mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        const dbConnection=mongoose.connection;
        
        /* ================ Binding connection to event (to get notification of connection )  =================*/
    
        dbConnection.on('error', console.error.bind(console, 'DB STATUS :: ERROR: [ ❌ ]'));
        dbConnection.on('connecting', console.info.bind(console, 'DB STATUS :: CONNECTING............. [ 🏃‍♂️ ]'));
        dbConnection.on('connected', console.info.bind(console, '\t 🏃‍♂️  DB STATUS :: CONNECTED [✔️]'.green));
    },
    findByEmailOrUserName:async function(email,username){
        try {
            let dbResponse = await userAccount.findOne(
                {$or:[
                    {"email":email},
                    {"userName":username},
                ],
            }).exec();
            
            return dbResponse; 
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByUserName:async function(username){
        try {
            let dbResponse = await userAccount.findOne(
                {$or:[
                    {"userName":username},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByUserId:async function(id){
        try {
            let dbResponse = await userAccount.findOne(
                {$or:[
                    {"_id":id},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    saveInDatabase:async function(modelName,dataObject){
        try {
            let dbResponse=await modelName.create(dataObject);
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findAllUsers:async function(){
        try {
            let dbResponse=await userAccount.find({}).exec();
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    }
}

const movieDBUtils={
    saveMovieInDatabase:async function(modelName,dataObject){
        try {
            let dbResponse=await modelName.create(dataObject);
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByMovieId:async function(id){
        try {
            let dbResponse = await movie.findOne(
                {$or:[
                    {"_id":id},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByMovieName:async function(movieName){
        try {
            let dbResponse = await movie.findOne(
                {$or:[
                    {"name":movieName},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findAllMovie:async function(){
        try {
            let dbResponse=await movie.find({}).exec();
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    deleteMovieByMovieId:async function(movieId){
        try {
            let dbResponse=await movie.findOneAndDelete(
                {"_id":movieId}).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    deleteAllMovie:async function(){
        try {
            let dbResponse=await movie.remove({}).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    updateMovieByMovieId:async function(movieId){
        try {
            let dbResponse=await movie.findOneAndUpdate(
                {"_id":movieId},{
                new: true
            }).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    saveMovie:async function(movieObject){
        try {
            let dbResponse=await movieObject.save()
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
}

const theatreDBUtils={
    saveTheatreInDatabase:async function(data){
        try {
            let dbResponse=await theatre.create(data);
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findAllTheatre:async function(){
        try {
            let dbResponse=await theatre.find({}).exec();
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByTheatreId:async function(id){
        try {
            let dbResponse = await theatre.findOne(
                {$or:[
                    {"_id":id},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByTheatreName:async function(theatreName){
        try {
            let dbResponse = await theatre.find(
                {$or:[
                    {"name":theatreName},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    deleteTheatreByTheatreId:async function(theatreId){
        try {
            let dbResponse=await theatre.findOneAndDelete(
                {"_id":theatreId}).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    deleteAllTheatre:async function(){
        try {
            let dbResponse=await theatre.remove({}).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    updateTheatreByTheatreId:async function(theatreId){
        try {
            let dbResponse=await theatre.findOneAndUpdate(
                {"_id":theatreId},{
                new: true
            }).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    saveTheatre:async function(theatreObject){
        try {
            let dbResponse=await theatreObject.save()
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
}

module.exports={
    dbUtils,
    movieDBUtils,
    theatreDBUtils
}

