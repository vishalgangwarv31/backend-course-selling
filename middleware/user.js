const jwt = require('jsonwebtoken');
const JWT_SECRET = "lalalskikdugfa123"

async function authUser(req,res,next) {
    const token = req.headers.token;

    const decode = await jwt.verify(token,JWT_SECRET);
    if(decode) {
        req.userId = decode.id;
        next();
    } else {
        res.status(403).json({
            message: "invalid credantials"
        })
    }
}

module.exports = {
    authUser : authUser,
    JWT_SECRET: JWT_SECRET
}