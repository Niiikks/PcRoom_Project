const usersDB = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handleLogin = async (req,res) => {
    const {name,password} = req.body;

    if(!name || !password) {
        return res.status(400).json({message : "name or password required"})
    }

    const user = await usersDB.findOne({name});

    if(!name) {
        return res.status(401).json({message : "user doesn't exist"})
    }

    const matchPwd = await bcrypt.compare(password, user.password);

    if(!matchPwd) {
        return res.status(401).json({message : "password doesn't match"})
    }

    try {
        const accessToken = await jwt.sign(
            {
                info : {
                    id : user._id,
                    name : user._id
                }
            },
            process.env.ACCESS_TOKEN,
            {expiresIn : '30s'}
        )

        const refreshToken = await jwt.sign(
            {
                info : {
                    id : user._id
                }
            },
            process.env.REFRESH_TOKEN,
            {
                expiresIn : '1d'
            }
        )

        await usersDB.updateOne(
            {_id : user._id},
            {$set : {refreshToken}}
        )

        res.cookie('jwt', refreshToken, {httpOnly : true, maxAge : 24*60*60*1000, SameSite : 'None', Secure : true})
        res.cookie('accessToken', accessToken, {httpOnly : true, maxAge : 60*60*1000, SameSite : 'None', Secure : true})
        res.json({accessToken})
    }
    catch(err) {
        res.status(500).json({message : err.message})
    }
}

module.exports = handleLogin