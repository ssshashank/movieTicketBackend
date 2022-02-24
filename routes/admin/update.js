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


router.put("/updateMovie/:movieId", [
    auth.userAuth.isLoggedIn,
    auth.userRole.getRole(UserRole.ADMIN),
    check("name").notEmpty().withMessage("Movie name is required.").trim(),
    check("genre").notEmpty().withMessage("Movie genre is required.").trim(),
    check("imageUrl").notEmpty().withMessage("Movie imageUrl is required.").trim(),
    check("description").notEmpty().withMessage("Movie description is required.").trim(),
    check("duration").notEmpty().withMessage("Movie duration is required.").trim(),
    check("releaseYear").notEmpty().withMessage("Movie releaseYear is required.").trim(),
], async (req, res) => {
    let responseCode, responseMessage, responseData;
    let movieId = req.params.movieId;
    try {
        let findMovieByIdResponse = await DB_UTILS.movieDBUtils.findByMovieId(movieId);

        if (!findMovieByIdResponse) {
            responseCode = HTTPStatusCode.NOT_FOUND
            responseMessage = HTTPStatusCode.NOT_FOUND
            responseData = "MOVIE ID NOT FOUND"
        } else {
            let getMovieDetails = await DB_UTILS.movieDBUtils.updateMovieByMovieId(movieId)  // UPDATE MOVIE BY MOVIE ID
            if (getMovieDetails) {
                getMovieDetails.name = req.body.name;
                getMovieDetails.genre = req.body.genre;
                getMovieDetails.imageUrl = req.body.imageUrl;
                getMovieDetails.description = req.body.description;
                getMovieDetails.duration = req.body.duration;
                getMovieDetails.releaseYear = req.body.releaseYear;
                const updateMovieResponse = await DB_UTILS.movieDBUtils.saveMovie(getMovieDetails)
                responseCode = HTTPStatusCode.OK
                responseData = updateMovieResponse;
                responseMessage = HTTPStatusCode.OK
            } else {
                responseCode = HTTPStatusCode.NOT_FOUND;
                responseData = "PRODUCT ID NOT FOUND.";
                responseMessage = HTTPStatusCode.NOT_FOUND
            }
        }
    } catch (error) {
        responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData = error.toString();
        responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR
    } finally {
        return res.status(responseCode).send({ message: responseMessage, data: responseData })
    }
})

module.exports = router