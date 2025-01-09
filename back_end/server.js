require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/connDB');
const mongoose = require('mongoose');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const path = require('path');

const PORT = process.env.PORT || 3500;

connectDB();

const whiteList = ['http://127.0.0.1:5500', 'http://localhost:3500','file:///C:/Users/nino1/OneDrive/Desktop/PcRoom_Project/PcRoom_Project'];

const corsOptions = {
    origin : (origin, callback) => {
        console.log('Request Origin:', origin);
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null,true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStaus : 200
}

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("../Front_End"));

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'));
app.use('/loginPage', (req,res) => {
    res.sendFile(path.join(__dirname, '../Front_End/login.html'));
})
app.use('/registerPage', (req,res) => {
    res.sendFile(path.join(__dirname, '../Front_End/registration.html'));
})
app.use('/main', (req,res) => {
    res.sendFile(path.join(__dirname, '../Front_End/index.html'));
})
app.use('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../Front_End/login.html'));
})

app.use(verifyJWT);

app.use('/users', require('./routes/API/users'));
app.use('/logout', require('./routes/logout'));

mongoose.connection.once('open', ()=> {
    console.log('Database connected succesfully');
    app.listen(PORT, console.log('server is running'))
})