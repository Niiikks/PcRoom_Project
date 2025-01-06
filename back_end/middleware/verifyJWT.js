const jwt = require('jsonwebtoken');

const verifyJWT = async (req,res,next) => {
    const token = req.cookies.accessToken;

    if(!token) {
        return res.status(401).json({message : "invalid Bearer token"});
    }

    await jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err,decoded) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.body.id = decoded.info.id;
            req.body.name = decoded.info.name;
            next();
        }
    )
}

module.exports = verifyJWT;