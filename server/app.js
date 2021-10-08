require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');

const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

const userRouter = require("./route/user");
const subjectRouter = require("./route/subject");


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:"thisisassecret",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose
.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB connected..."))
.catch(err => console.log(err));



app.use("/api/user", userRouter);
app.use("/api/subject",subjectRouter);


app.listen(port,function(){
    console.log(`server is listening on port ${port}`);
});

