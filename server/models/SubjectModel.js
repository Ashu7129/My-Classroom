const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author:String,
    description:String,
    comments:[]
});


const subjectSchema = new mongoose.Schema({
    name:String,
    description:String,
    code:String,
    posts:[postSchema],
    teacher:String,
    user:[{}],
    assignments:[],
    tests:[],
    time:String
});

const Subject = mongoose.model("subject",subjectSchema);

module.exports = Subject;