require('dotenv').config();
const mongoose=require("mongoose");
const userAccount=require("../models/userAccount");

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
}

module.exports={
    dbUtils,
}