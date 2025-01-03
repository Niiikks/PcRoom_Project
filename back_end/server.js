require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/connDB');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3500;

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/register', require('./routes/register'))

mongoose.connection.once('open', ()=> {
    console.log('Database connected succesfully');
    app.listen(PORT, console.log('server is running'))

})