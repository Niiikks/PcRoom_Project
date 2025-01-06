const usersDB = require('../models/users')

const getUser = async (req,res) => {
    const id = req.body.id;

    if(!id) {
        return res.status(401).json({message : "id couldn't found"})
    }

    const user = await usersDB.findOne({_id : id})

    if(!user) {
        return res.status(204).json({message : "user couldn't found"})
    }

    return res.json(user)
}

module.exports = {getUser}