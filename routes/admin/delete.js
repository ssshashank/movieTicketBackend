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


router.delete("/deleteAllMovie",[
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
    ],async(req,res)=>{
        let responseCode, responseMessage, responseData;
        try {
            let dbResponse = await DB_UTILS.movieDBUtils.deleteAllMovie();  //DELETE ALL MOVIE
            if (!dbResponse) {
                responseCode = HTTPStatusCode.FORBIDDEN
                responseMessage = HTTPStatusCode.FORBIDDEN;
                responseData = "INVALID PROFILE.";
            } else {
                responseCode = HTTPStatusCode.OK
                responseMessage = HTTPStatusCode.OK;
                responseData = dbResponse;
            }
        } catch (error) {
            responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
            responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
            responseData = error.toString();
        } finally {
            return res.status(responseCode).send({ message: responseMessage, data: responseData })
        }
});

router.delete("/deleteAllTheatre",[
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
    ],async(req,res)=>{
        let responseCode, responseMessage, responseData;
        try {
            let dbResponse = await DB_UTILS.theatreDBUtils.deleteAllTheatre();  //DELETE ALL THEATRE
            if (!dbResponse) {
                responseCode = HTTPStatusCode.FORBIDDEN
                responseMessage = HTTPStatusCode.FORBIDDEN;
                responseData = "INVALID PROFILE.";
            } else {
                responseCode = HTTPStatusCode.OK
                responseMessage = HTTPStatusCode.OK;
                responseData = dbResponse;
            }
        } catch (error) {
            responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
            responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
            responseData = error.toString();
        } finally {
            return res.status(responseCode).send({ message: responseMessage, data: responseData })
        }
});

router.delete("/deleteMovie/:movieId", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN)
], async (req, res) => {
    let responseCode, responseMessage, responseData;
    let movieId = req.params.movieId;
    try {
        let findMovieByIdResponse = await DB_UTILS.movieDBUtils.findByMovieId(movieId);
        if (!findMovieByIdResponse) {
            responseCode = HTTPStatusCode.NOT_FOUND
            responseMessage = HTTPStatusCode.NOT_FOUND
            responseData = "MOVIE NOT FOUND"
        } else {
            let deleteDBResponse = await DB_UTILS.movieDBUtils.deleteMovieByMovieId(movieId)
            if (!deleteDBResponse) {
                responseCode = HTTPStatusCode.FORBIDDEN;
                responseMessage = HTTPStatusCode.FORBIDDEN
                responseData = "INVALID MOVIE ID"
            } else {
                responseCode = HTTPStatusCode.OK
                responseMessage = HTTPStatusCode.OK
                responseData = deleteDBResponse
            }
        }
    } catch (error) {
        responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
        responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData = error.toString();
    } finally {
        return res.status(responseCode).send({ message: responseMessage, data: responseData })
    }
})

router.delete("/deleteTheatre/:theatreId", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN)
], async (req, res) => {
    let responseCode, responseMessage, responseData;
    let theatreId = req.params.theatreId;
    try {
        let findMovieByIdResponse = await DB_UTILS.theatreDBUtils.findByTheatreId(theatreId);
        if (!findMovieByIdResponse) {
            responseCode = HTTPStatusCode.NOT_FOUND
            responseMessage = HTTPStatusCode.NOT_FOUND
            responseData = "THEATRE NOT FOUND"
        } else {
            let deleteDBResponse = await DB_UTILS.theatreDBUtils.deleteTheatreByTheatreId(theatreId)
            if (!deleteDBResponse) {
                responseCode = HTTPStatusCode.FORBIDDEN;
                responseMessage = HTTPStatusCode.FORBIDDEN
                responseData = "INVALID THEATRE ID"
            } else {
                responseCode = HTTPStatusCode.OK
                responseMessage = HTTPStatusCode.OK
                responseData = deleteDBResponse
            }
        }
    } catch (error) {
        responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
        responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData = error.toString();
    } finally {
        return res.status(responseCode).send({ message: responseMessage, data: responseData })
    }
})
module.exports=router;