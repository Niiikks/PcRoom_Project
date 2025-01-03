const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
    name : String,
    mail : {
        type : String,
        required : true,
        unique: true
    },
    country : String,
    city : String,
    phone : {
        type : String,
        require : true,
        unique : true
    },
    date : String,
    password : {
        type : String,
        required : true,
        unique : true
    },
    refreshToken : String,

}) 

module.exports = mongoose.model('users', usersSchema);