const express = require('express') 
const db = require('mongoose')
const { userRouter } = require('./Router/User')
const { adminRouter } = require('./Router/admin')
const { purchaseRouter } = require('./Router/course')

const app = express();
app.use(express.json());

app.use("/api/paise",purchaseRouter);
app.use("/api/user",userRouter);
app.use('/api/admin',adminRouter)

async function main() {
    try{
        db.connect("")
    } catch(err){
        console.log(err);
        res.json({
            message : "database in not connected"
        })
    }
    app.listen(3000,(req,res)=>{
        console.log("server is running")
    })
}


main();