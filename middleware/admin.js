const jwt = require('jsonwebtoken');
const JWT_SECRET = "lalala123"

async function authAdmin(req,res,next) {
    const token = req.headers.token;

    const decode = await jwt.verify(token,JWT_SECRET);
    if(decode) {
        req.adminId = decode.id;
        next();
    } else {
        res.status(403).json({
            message: "invalid credantials"
        })
    }
}

module.exports = {
    authAdmin : authAdmin,
    JWT_SECRET: JWT_SECRET
}