/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/

require('dotenv').config();
const express=require("express");
const app=express();
const router=express.Router();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');

/* ================ UTILS FILES  =================*/
const BASIC_UTILS=require("../../utils/basicUtils");
const DB_UTILS=require("../../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode }=require("../../constants/network");

/* ================ MODELS FILES  =================*/
const userAccount=require("../../models/userAccount");

/* ================ CORE FILES  =================*/
const auth=require("../../core/users/usersAuth");
const { UserRole } = require('../../constants/application');



router.post("/login",[
    check("username").notEmpty().withMessage("Username is required.").trim().isAlphanumeric().withMessage("Username should be alphanumeric."),
    check("password").notEmpty().withMessage("Password is required.").trim().isLength({min:6}).withMessage("Password must be at least 6 character long"),
    ],async (req,res)=>{
    let responseCode,responseMessage,responseData;
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            responseCode=HTTPStatusCode.BAD_REQUEST;
            responseData=errors;
            responseMessage=HTTPStatusCode.BAD_REQUEST;
        }else{
            let dbResponse=await DB_UTILS.dbUtils.findByUserName(req.body.username)
            if(dbResponse){
                const isPasswordMatched=await bcrypt.compare(req.body.password,dbResponse.password); // MATCH PASSWORD
                if(isPasswordMatched){
                    const token=await dbResponse.createToken();              // CREATE TOKEN
                    dbResponse.token=token;                         // ASSIGNING JWT TOKEN
                    responseCode=HTTPStatusCode.OK;
                    responseMessage=HTTPStatusCode.OK;
                    responseData=dbResponse
                    
                }else{
                    responseCode=HTTPStatusCode.NOT_FOUND;
                    responseMessage=HTTPStatusCode.NOT_FOUND;
                    responseData="PASSWORD DOESN'T MATCH."
                }
            }else{
                responseCode=HTTPStatusCode.NOT_FOUND;
                responseMessage=HTTPStatusCode.NOT_FOUND;
                responseData="USER NOT FOUND."
            }
        }
    } catch (error) {
        responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
        responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData = error.toString();
    }
    finally{
        return res.status(responseCode ).send({message:responseMessage,data:responseData})
    }
    
})


router.post("/signup", [
    check("email").notEmpty().withMessage("Email is Required.").trim().isEmail().withMessage("Please enter a valid Email."),
    check("username").notEmpty().withMessage("Username is required.").trim().isAlphanumeric().withMessage("Username should be alphanumeric."),
    check("password").notEmpty().withMessage("Password is required.").trim().isLength({min:6}).withMessage("Password must be at least 6 character long"),
    check("name").notEmpty().withMessage("Name is required.").trim()
    ],async(req,res)=>{
        let responseCode,responseMessage,responseData;
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            responseCode=HTTPStatusCode.BAD_REQUEST;
            responseData=errors;
            responseMessage=HTTPStatusCode.BAD_REQUEST;
        }else{
            let signupData={
                "email":req.body.email,
                "userName":req.body.username,
                "password":req.body.password,
                "contact":req.body.contact,
                "name":req.body.name,
                "role":req.body.role===UserRole.ADMIN ?UserRole.ADMIN:UserRole.USER
            }
            console.log("signupData---",signupData)
            let dbResponse=await DB_UTILS.dbUtils.findByEmailOrUserName(req.body.email,req.body.username)   // CHECK USER ALREADY EXIST
            console.log("dbResponse-----------",dbResponse)
            if(!dbResponse){
                let signupData={
                    "email":req.body.email,
                    "userName":req.body.username,
                    "password":req.body.password,
                    "contact":req.body.contact,
                    "name":req.body.name,
                    "role":req.body.role===UserRole.ADMIN ?UserRole.ADMIN:UserRole.USER
                }
                let signedUpResponse=await DB_UTILS.dbUtils.saveInDatabase(userAccount,signupData);       // ADD USER IN DATABASE
                const token=await signedUpResponse.createToken();                // CREATE TOKEN
                signedUpResponse.token=token;
                responseCode=HTTPStatusCode.CREATED;
                responseMessage=HTTPStatusCode.CREATED;
                responseData=signedUpResponse
            }else{
                responseCode=HTTPStatusCode.FORBIDDEN;
                responseMessage=HTTPStatusCode.FORBIDDEN;
                responseData="USER ALREADY EXISTS."
            }
        }
    } catch (error) {
        responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
        responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData = error.toString();
    }finally{
        return res.status(responseCode ).send({message:responseMessage,data:responseData})
    }
})

module.exports=router;