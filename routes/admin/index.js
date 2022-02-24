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


const updateRouter=require("./update");
const getRouter=require("./get")
const postRouter=require("./post");
const deleteRouter=require("./delete")


router.use("/post",postRouter);
router.use("/get",getRouter);
router.use("/delete",deleteRouter);
router.use("/update",updateRouter);



module.exports = router;