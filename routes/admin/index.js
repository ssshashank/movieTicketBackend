/*
     _       _           _       
    / \   __| |_ __ ___ (_)_ __  
   / _ \ / _` | '_ ` _ \| | '_ \ 
  / ___ \ (_| | | | | | | | | | |
 /_/   \_\__,_|_| |_| |_|_|_| |_|
*/


const express = require("express");
const app = express();
const router = express.Router();

/* const getRouter=require("./get");
const postRouter=require("./post");
const updateRouter=require("./update");
const deleteRouter=require("./delete");
 */
const getRouter=require("./get")
const postRouter=require("./post");

router.use("/post",postRouter);
router.use("/get",getRouter);

/* router.use("/get",getRouter);
router.use("/post",postRouter); */
/* 
router.use("/update",updateRouter);
router.use("/delete",deleteRouter); */


module.exports = router;