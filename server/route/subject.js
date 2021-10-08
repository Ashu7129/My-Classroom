const express = require("express");
const router  = express.Router();
const passport = require("../passport");
router.use(express.urlencoded({ extended: true }));

const User = require("../models/Usermodel");
const Subject = require("../models/SubjectModel");



function AddSubject(subject,user,res){
    const new_subject = Subject({
        name:subject.name,
        description:subject.description,
        code:subject.code,
        teacher:subject.teacher
    });
    new_subject.save();

    User.findOne({_id:user._id}, (err, found)=>{
        if(!err){
            found.subjects.push(new_subject);
            found.save((err, result)=>{
                if(err) console.log(err);
                res.send("Added succesfully");
            });
        }
    });



}

router.post("/addSubject",
(req, res)=>{
    if(req.user.usertype=="teacher"){
        AddSubject(req.body,req.user,res)
    }else{
        res.send("Cannot add subject");
    }
});


router.post("/getasubject",(req,res)=>{
    if(req.isAuthenticated()){
        Subject.findOne({_id:req.body.subjectId}, (err, found)=>{
            if(found){
                res.send(found);
                
            }else{
                res.send("null");
            }
        });
    }else{
        res.send("null");
    }
});

router.post("/addpost", (req, res)=>{
    const subjectId = req.body.subjectId;
    const description = req.body.description;
    const author = req.user.name;
    if(req.isAuthenticated()){
        Subject.findOne({_id:subjectId}, (err, found)=>{
            if(!err){
                found.posts.push({author:author,description:description});
                found.save((err, result)=>{
                    res.send("updated succesfully");
                })
                
            }else{
                res.send("null");
            }
        });
    }else{
        res.send("null");
    }
});

router.post("/joinsubject", (req,res)=>{
    const {userId, subjectCode} = req.body.user;
    if(req.isAuthenticated()){
        Subject.findOne({code:subjectCode}, (err, found)=>{
            if(found){
                const subject = {
                    _id:found._id,
                    name:found.name,
                    description:found.description,
                    code:found.code,
                    teacher:found.teacher
                }
                  
                User.findOne({_id:userId}, (err, user)=>{
                    if(!err){
                        //Adding to student/user database
                        user.subjects.push(subject);
                        
                        //Adding to subject database
                        found.user.push({
                            _id:user._id,
                            name:user.name,
                            username:user.username,
                            usertype:user.usertype
                        });
                        found.save();

                        user.save((err, result)=>{
                            res.send("Joined Class Succesfully !");
                        });
                    }
                });
                
            }else{
                res.send("Subject Not Found !");
            }
        });
    }else{
        res.send("Not Authenticated !");
    }
})

module.exports = router;