/*
     _       _           _       
    / \   __| |_ __ ___ (_)_ __  
   / _ \ / _` | '_ ` _ \| | '_ \ 
  / ___ \ (_| | | | | | | | | | |
 /_/   \_\__,_|_| |_| |_|_|_| |_|
*/


require('dotenv').config();
const express = require("express");
const app = express();
const router = express.Router();
const { check, validationResult } = require('express-validator')

/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../../utils/basicUtils");
const DB_UTILS = require("../../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode } = require("../../constants/network");


/* ================ MODELS FILES  =================*/
const userAccount = require("../../models/userAccount");
const movie = require("../../models/movie");

/* ================ CORE FILES  =================*/
const auth = require("../../core/users/usersAuth");
const { UserRole } = require('../../constants/application');




router.get("/getAllUser", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
],
    async (req, res) => {
        let responseCode, responseMessage, responseData;
        try {
            let dbResponse = await DB_UTILS.dbUtils.findAllUsers(); // FIND ALL USERS
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
    })



router.get("/getAllMovie", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
],
    async (req, res) => {
        let responseCode, responseMessage, responseData;
        try {
            let dbResponse = await DB_UTILS.movieDBUtils.findAllMovie();  //FIND ALL MOVIE
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
    }
)

router.get("/getMovie/:movieId", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
], async (req, res) => {
    let responseCode, responseMessage, responseData;
    let movieId = req.params.movieId;
    try {
        let dbResponse = await DB_UTILS.movieDBUtils.findByMovieId(movieId)  //FIND MOVIE BY MOVIE ID
        if (!dbResponse) {
            responseCode = HTTPStatusCode.FORBIDDEN
            responseMessage = HTTPStatusCode.FORBIDDEN;
            responseData = "INVALID MOVIE ID.";
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
}
)

router.get("/getMovieName/:movieName", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
], async (req, res) => {
    let responseCode, responseMessage, responseData;
    let movieName = req.params.movieName;
    try {
        let dbResponse = await DB_UTILS.movieDBUtils.findByMovieName(movieName)  //FIND MOVIE BY MOVIE ID

        if (!dbResponse) {
            responseCode = HTTPStatusCode.FORBIDDEN
            responseMessage = HTTPStatusCode.FORBIDDEN;
            responseData = "INVALID MOVIE NAME.";
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
}
)


module.exports = router;