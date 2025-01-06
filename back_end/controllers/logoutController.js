const usersDB = require('../models/users');

const handleLogout = async (req,res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.jwt;

    if(!accessToken || !refreshToken) {
        return res.sendStatus(204);
    }

    const user = usersDB.findOne({refreshToken})

    if(!user) {
        res.clearCookie('jwt', {httpOnly : true, sameSite: 'None', secure : true})
        res.clearCookie('accessToken', {httpOnly : true, sameSite : 'None', secure : true });
        return res.sendStatus(204);
    }

    await user.updateOne(
        {_id : user._id},
        {$set : {refreshToken : ""}}
    )
    res.clearCookie('jwt', {httpOnly : true, sameSite: 'None', secure : true})
    res.clearCookie('accessToken', {httpOnly : true, sameSite : 'None', secure : true });
    res.sendStatus(204);
}

module.exports = handleLogout;