const express = require("express");
const router  = express.Router();
const passport = require("../passport");
router.use(express.urlencoded({ extended: true }));

const User = require("../models/Usermodel");



router.get("/auth/google",passport.authenticate("google", { scope: ["profile"] }),(req,res)=>{
    console.log("GoogleAuthVerified");
});

router.get("/getuser", (req, res)=> {
    if(req.isAuthenticated()){
        User.findOne({_id:req.user._id}, function(err, found){
            if(!err){
                res.send(found);
            }
        })
    }else{
        res.send({userType:"null",subjects:[]});
    }
});

router.post("/register", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const usertype = req.body.usertype;

    User.register({username:username , name:name,usertype:usertype}, password, function (err, user){
        if(err){
            console.log(err);
            res.send({
                message:"User exist! Please try another email",
                user:null
            });
        }else{
            passport.authenticate('local')(req, res, function(){
                res.send({
                    message:"Registered succesfully! Please wait...",
                    user:user
                });
            });
        }
    });

});

router.post('/login',
    // (req, res, next)=>{
    //     console.log("try to Login in with")
    //     console.log(req.body);
    //     next();
    // },
    passport.authenticate('local', {failureRedirect:"/api/user/error"}),
    (req,res)=> {
        res.send({
            message:"Logging you please wait...",
            user:req.user
        });
    }
);

router.get("/error",(req,res)=>{
    res.send({
        message:"Invalid Username/password !",
        user:null,
    });
});

router.get("/logout",(req, res)=>{
    req.logout();
    res.send("logged out succesfully");
})
module.exports = router;