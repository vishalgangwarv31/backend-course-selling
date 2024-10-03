const { Router } = require('express')
const { adminModel, courseModel } = require('../schema')
const { JWT_SECRET , authAdmin  } = require('../middleware/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const adminRouter = Router();

adminRouter.post('/signup',(req,res)=>{
    const {email , password , firstName, lastName } = req.body;
    
    try{
        bcrypt.hash(password,5, (err,hash)=>{
            adminModel.create({
                email : email,
                password : hash,
                firstName : firstName,
                lastName: lastName
            })
        })
        res.json({
            message : "admin signned up"
        })
    } catch (err) {
        console.log(err);
        res.json({
            message : "error in signup"
        })
    }
})

adminRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    console.log(email)

    const data = await adminModel.findOne({
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

adminRouter.post('/upload',authAdmin,async (req,res)=>{
    
    const id = req.adminId
    const {title , description,price,imageUrl} = req.body
    try{
        await courseModel.create({
            title: title,
            description: description,
            price:price,
            imageUrl: imageUrl,
            creatorId: id
        })

        res.json({
            message: "course added"
        })
    } catch(err){
        console.log(err);
        res.json({
            message :"cant add course "
        })
    }
})

adminRouter.get('/course',authAdmin,async (req,res)=>{
    const id = req.adminId
    const response = await courseModel.find({
        creatorId: id
    })
    res.json({response})
})


module.exports = {
    adminRouter
};