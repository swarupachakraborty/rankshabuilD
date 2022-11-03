const express = require('express');
const router = express.Router();
const {authentication,authorize}=require('../Middleware/auth')
const userController = require("../Controller/userController")
const topicController=require("../Controller/topicController")
router.post("/register",userController.CreateUser)
router.post("/loginn",userController.userLogin)
router.post("/topicc",authentication,topicController.createTopic)
router.get("/toppic:userId",authentication,topicController.getTopic)
module.exports=router;
