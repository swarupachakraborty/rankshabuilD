const topicModel=require("../Model/topicModel")
const{isValid,isValidRequestBody}=require("../Controller/userController")
const userModel=require("../Model/userModel")
const mongoose = require("mongoose");
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
  };


  const validString = (String) => {
    if (/\d/.test(String)) {
      return true
    } else {
      return false;
    };
  };
  const createTopic = async (req, res) => {

    try {
        // Extract body 
        const reqBody = req.body;
  
        // Object Destructing
        const { topictitle,userId,category,ranking,isDeleted} = reqBody;
  
        // Check data is coming or not
        if (!isValidRequestBody(reqBody)) {
            return res.status(400).send({ status: false, message: "Please Enter the All topic Details" })
        }
  
        // Check title is coming or not
        if (!isValid(topictitle)) {
            return res.status(400).send({ status: false, message: 'Title is Required' });
        }
        
        // Check duplicate title
        const duplicateTitle = await topicModel.findOne({ topictitle: topictitle })
        if (duplicateTitle) {
            return res.status(400).send({ status: false, message: "Title is Already presents" })
        }
  
        
       
  
        // Check userId is coming or not
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: 'userId is Required' });
        }
  
        // Check userId is valid or not
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: 'Please enter valid user ID' });
        }
  
        // Check Duplicate UserId
        const duplicateUserId = await userModel.findOne({ userId: userId });
        if (!duplicateUserId) {
            return res.status(400).send({ status: true, message: "User ID is Not exists in our Database" })
        }
  
        
   // Check category is coming or not
        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: 'category is Required' });
        }
   // Valid ranks are coming
   const data=req.body
   const decodedtoken= req.decodedtoken
   if(decodedtoken.userId !== data.userId) return res.status(400).send({status:false,msg : "YOU ARE NOT AUTHORIZED TO CREATE Topic WITH THIS user ID"})
//    const userParams=req.params.userId
//    if (!isValidObjectId(userParams)) {
//     return res.status(400).send({ status: false, msg: "Pls provide valid userId" })
// }
// const searchUser = await userModel.findById({ _id: userParams })
//         if (!searchUser) {
//             return res.status(400).send({ status: false, msg: `${userParams} user is not present` })
//         }
      if  (!data.ranking) return res.status(400).send({ status: false, message: "Ranking is required and should not be less than 0" });

      if(!validString(data.ranking)) return res.status(400).send({ status: false, message: "Rating should be in numbers" });
      if(!((data.ranking < 100) && (data.ranking > 0))) return res.status(400).send({ status: false, message: "Rating should be between 0 - 100 numbers" });
  
   





        // check if isDeleted true
        if(isDeleted === true){
            return res.status(400).send({ status: false, message: "No Data Should Be Deleted At The Time Of Creation" })
        }
   // After All Successful Validation then Create Topic
        const topicDetails = await topicModel.create(reqBody)
        return res.status(201).send({ status: true, message: 'successfully created ', data: { topicDetails } })
            
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })  
  };
   }
   const getTopic = async function (req, res) {
    try {
       
        const { userId } = req.params.userId
        // user id vlidation 
        if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "userid not valid" })
        }
  
    //     if (!isValid(category)) {
    //       return res.status(400).send({ status: false, message: 'category is Required' });
    //   }
  
    
        // filtering by query
        const query=req.query
        const{topictitle}=req.query
        if (!isValid(topictitle)) {
            return res.status(400).send({ status: false, message: 'Title is Required' });
        }
        
        const filterdtopic = await topicModel.find({ $and: [{ isDeleted: false }, query] })
            .select({ topictitle: 1, ranking: 1  });
  
        if (!filterdtopic.length) {
            return res.status(400).send({ status: false, msg: "No topic exist" })
        }
       
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
  };
  
  



//    ////////////////////////////////////////////////////////////////////////////////

  module.exports={createTopic,getTopic} 