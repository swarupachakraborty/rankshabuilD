const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const userModel = require("../Model/userModel")
const topicModel=require("../Model/topicModel")

const authentication = async function (req, res, next) {
  
  
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(400).send({ status: false, msg: "please add token" });
    }
    let decodedtoken = jwt.verify(token, "My private key",);
  
   
    req.decodedtoken = decodedtoken;
  
    next();
  };
  
  const authorize = async function (req, res, next) {
    let topicId = req.params.topicId;
    let get = await topicModel.findById(topicId).select({ userId: 1, _id: 0 });
    if(!get){return res.status(400).send({ status: false, msg: "Please enter valid Blog id" });}
  
   
    
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(400).send({ status: false, msg: "KINDLY ADD TOKEN" });
    }
    let decodedtoken = jwt.verify(token, "My private key");
    if (decodedtoken.userId != get.userId) {
      return res.status(403).send({ status: false, msg: "unauthorize acess" });
    }
    next();
  };
  module.exports = { authentication, authorize };
  
  
