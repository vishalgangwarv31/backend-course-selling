const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel, purchaseModel } = require('../schema');
const { JWT_SECRET , authUser } = require("../middleware/user")


const userRouter = Router();

userRouter.post('/signup',(req,res)=>{
    const {email , password , firstName, lastName } = req.body;
    
    try{
        bcrypt.hash(password,5, (err,hash)=>{
            userModel.create({
                email : email,
                password : hash,
                firstName : firstName,
                lastName: lastName
            })
        })
        res.json({
            message : "user signned up"
        })
    } catch (err) {
        console.log(err);
        res.json({
            message : "error in signup"
        })
    }
})

userRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    console.log(email)

    const data = await userModel.findOne({
        email:email
    });
    if(await bcrypt.compare(password,data.password)) {
        const token = jwt.sign({
            id:data._id
        },JWT_SECRET);
        res.json({
            token:token
        })
    } else {
        res.json({
            message : "invalid credential"
        })
    }
})

userRouter.get('/mycourse' ,authUser,async (req,res)=>{
    const id = req.userId;

    try{
        const data = await purchaseModel.find({
            userId:id
        })
        res.json({data})
    } catch (err) {
        console.log(err);
        res.json({
            message :"cant fetch courses now"
        })
    }
})



module.exports = {
    userRouter : userRouter
};