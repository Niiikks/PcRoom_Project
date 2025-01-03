const usersDB = require('../models/users')
const bcrypt = require('bcrypt');

const registerController = async (req,res) => {
    const {name,mail,country,city,phone,date,password} = req.body;

    if(!name || !mail || !country || !city || !phone || !date || !password) {
        return res.status(400).json({message : "missing info about user"})
    }

    const dublicate = await usersDB.findOne({name : name})

    if(dublicate) {
        return res.status(409).json({message : "this users already exists"})
    }

    try {
        const hashedPwd = await bcrypt.hash(password,10);
        const result = await usersDB.create({
            name : name,
            mail : mail,
            country : country,
            city : city,
            phone : phone,
            date : date,
            password : hashedPwd
        })
        return res.status(204).json({message : "new user has been created"})
    }
    catch (err) {
        return res.status(500).json({message : err.message})
    }
}

module.exports = registerController;