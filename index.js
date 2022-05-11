require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs"); 
const app = express();
const tailor = require('./Routes/tailor');
const user = require('./Routes/user');
const admin = require('./Routes/admin');
const product = require('./Routes/products');
const teacher = require('./Routes/teacher');
const card = require('./Routes/card');
const student = require('./Routes/student');
const classes = require('./Routes/class');
const schoolStudents = require('./Routes/schoolStudent');
const cookieParser = require('cookie-parser');

 
const jwt = require("jsonwebtoken");

console.log(process.env.SECRET_KEY)

const createToken = async() =>{
    const token = await jwt.sign({_id : "6268caeee4da2b264c8d65eb"} , process.env.SECRET_KEY , {
        expiresIn : "2 seconds"
    });
    console.log(token);

    const userVer = await jwt.verify(token , "mynameisvinodbaharurthapa")
    console.log(userVer)
}

console.log("start of token")
createToken()
console.log("end of token")



console.log("ALLAH U AKBAR")



var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // For legacy browser support
}

app.set('view engine', 'ejs');
// app.use('/uploads', express.static('/uploads'));
// app.use(express.static(__dirname));
app.use(cors(corsOptions));
app.use(express.json());
// var port = process.env.PORT || 8080;
app.use(cookieParser());
app.use(express.static(__dirname + '/uploads'));

app.use('/api/tailor', tailor);
app.use('/api/user', user);
app.use('/api/card',card)
app.use('/api/admin', admin);
app.use('/api/products', product);
app.use('/api/teacher',teacher);
app.use('/api/student',student);
app.use('/api/classes',classes);
app.use('/api/schoolStudents',schoolStudents)

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://maham:maham2000@cluster0.5vxx9.mongodb.net/tinder-clone?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    {useFindAndModify : false})
    .then(() => console.log("Connected to School Portal...."))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("Welcome to Student Portal.....")
    console.log("ok")
    // res.render('index');
})

//heuroko

if (process.env.NODE_ENV == 'production'){
    app.use(express.static("frontendnew/build"));
    
}

app.listen(process.env.PORT || 8080, () => {
    console.log("listening on port no 8080");
})
