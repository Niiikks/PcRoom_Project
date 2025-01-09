const usersDB = require('../models/users');
const jwt = require("jsonwebtoken");

const handleRefresh = async (req,res) => {
    const refreshToken = req.cookies.jwt;
    if(!refreshToken) {
        return res.sendStatus(401);
    }

    const user = await usersDB.findOne({refreshToken});

    if(!user) {
        res.clearCookie('jwt', {httpOnly : true, sameSite : "None", secure : true})
        return res.sendStatus(403);
    }

    await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err,decoded) => {
            if(err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"info" : {
                    "id" : user.id,
                    "name" : user.name
                }},
                process.env.ACCESS_TOKEN,
                {expiresIn : "30s"}
            )
            res.cookie('accessToken', accessToken, {httpOnly : true, sameSite : "None", secure : true})
            return res.sendStatus(200);
        }
    )

}

module.exports = handleRefresh;