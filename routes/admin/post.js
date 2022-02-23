/*
     _       _           _       
    / \   __| |_ __ ___ (_)_ __  
   / _ \ / _` | '_ ` _ \| | '_ \ 
  / ___ \ (_| | | | | | | | | | |
 /_/   \_\__,_|_| |_| |_|_|_| |_|
*/


require('dotenv').config();
const express=require("express");
const app=express();
const router=express.Router();
const { check, validationResult } = require('express-validator')

/* ================ UTILS FILES  =================*/
const BASIC_UTILS=require("../../utils/basicUtils");
const DB_UTILS=require("../../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode }=require("../../constants/network");


/* ================ MODELS FILES  =================*/
const userAccount=require("../../models/userAccount");
const movie=require("../../models/movie");

/* ================ CORE FILES  =================*/
const auth=require("../../core/users/usersAuth");
const { UserRole } = require('../../constants/application');


router.post("/addMovie",[
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
    check("name").notEmpty().withMessage("Movie name is required.").trim(),
    check("genre").notEmpty().withMessage("Movie genre is required.").trim(),
    check("imageUrl").notEmpty().withMessage("Movie imageUrl is required.").trim(),
    check("description").notEmpty().withMessage("Movie description is required.").trim()
],async(req,res)=>{
    let responseCode,responseMessage,responseData;
    const userId=res.locals.user.userId;
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            responseCode=HTTPStatusCode.BAD_REQUEST;
            responseData=errors;
            responseMessage=HTTPStatusCode.BAD_REQUEST;
        }else{
            if(!userId){
                responseCode=HTTPStatusCode.FORBIDDEN;
                responseData="USER IS NOT AUTHENTICATED.";
                responseMessage=HTTPStatusCode.FORBIDDEN
            }else{
                const responseByMovieName=await DB_UTILS.movieDBUtils.findByMovieName(req.body.name);
                if(!responseByMovieName){
                    let movieData={
                        "name":req.body.name,
                        "genre":req.body.genre,
                        "imageUrl":req.body.imageUrl,
                        "description":req.body.description
                    }
                    let addMovieResponse=await DB_UTILS.movieDBUtils.saveMovieInDatabase(movie,movieData)
                    responseCode=HTTPStatusCode.CREATED;
                    responseMessage=HTTPStatusCode.CREATED;
                    responseData=addMovieResponse
                }else{
                    responseCode=HTTPStatusCode.FORBIDDEN;
                    responseMessage=HTTPStatusCode.FORBIDDEN;
                    responseData="MOVIE ALREADY EXISTS."
                }
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