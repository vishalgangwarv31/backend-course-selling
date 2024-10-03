const {Router} = require('express')
const { purchaseModel } = require("../schema")
const { authUser } = require('../middleware/user')

const purchaseRouter = Router();

purchaseRouter.post('/buy',authUser,(req,res)=>{
    const id = req.userId;
    const courseId = req.body.courseId;

    try{
        purchaseModel.create({
            userId: id,
            courseId: courseId
        })
        res.json({
            message: 'congrats! you bought a course, Happy learning and i want to kill myself'
        })
    } catch (err) {
        console.log(err);
        res.json({
            message : "something went wrong"
        })
    }
})

purchaseRouter.post('/preview',authUser,async (req,res)=>{
    const id = req.userId;
    const courseId = req.body.courseId;

    try{
        const response = await purchaseModel.find({})

        res.json({
            response
        })
    } catch (err) {
        console.log(err);
        res.json({
            message : "something went wrong"
        })
    }
})

module.exports= {
    purchaseRouter
}