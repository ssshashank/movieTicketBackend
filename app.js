require('dotenv').config();
require('colors');
const express=require("express");
const app=express();
const path=require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session=require("express-session");
const helmet = require('helmet');
const SHA256 = require("crypto-js/sha256");
const MongoStore = require('connect-mongo');
const mongoose=require("mongoose");
const cors = require('cors');
const port=process.env.PORT

    /* ================ Configuring UTILITY PACKAGES START  =================*/
    
    const BASIC_UTILS = require("./utils/basicUtils.js");
    const DB_UTILS=require("./utils/dbUtils");
    
    /* ================ Configuring UTILITY PACKAGES END  =================*/

    
    
/* ================ Configuring Database START  =================*/
    DB_UTILS.dbUtils.dbInit(); 
/* ================ Configuring Database END  =================*/

    
    
    
    /* ================ Session Management STARTS  =================*/

    const sessionSettings = {
        secret: SHA256(BASIC_UTILS.randomString(20)).toString(),
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true,maxAge:180*60*1000 },
        store:MongoStore.create({
            mongoUrl: process.env.DB_CONNECTION_STRING
        })
    }
    app.use(session(sessionSettings));

    /* ================ Session Management ENDS  =================*/

    /* ================ Configuring body and Cookie Parser STARTS  =================*/

    app.use(cors());
    app.options('*', cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, "/public", "build")));
    app.use(helmet());

    /* ================ Configuring body and Cookie Parser END  =================*/


    /* ================ Connecting with the PORT STARTS  =================*/

    const onListening=() =>{
        bootstrapMessage();
    }

    const bootstrapMessage=()=>{
        console.info(`\n\t SERVER IS ONLINE [ 📢 ] AND RUNNING [ 🚀 ]  \n
        \n\t -ON PORT :: ${port}
        \n\t -STARTED AT :: ${new Date()}
        \n\t---------------------- ONLINE MOVIE TICKET LOGS ----------------------\n `.rainbow);
    }

    app.listen(port).on('listening',onListening);

    /* ================ Connecting with the PORT STARTS  =================*/