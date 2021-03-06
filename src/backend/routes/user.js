const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next)=>{
    bcrypt.hash(req.body.password,10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            role: "guest"
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});

router.post("/login", (req, res, next)=>{
    //find user with the same email
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(user=> {
        if(!user){ //if there is no such user
            return res.status(401).json({
                message: "email don't exist"
            });
        }
        fetchedUser = user;
        // check if password match (compare hashed passwords).
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message: "wrong password"
            });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },'secret_should_be_longer', { expiresIn: "1h" });
        res.status(200).json({
            token: token,
            expiresIn: 3600
        });
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
        }); 
    })
});

router.get('/deleteUser/:email',(req,res)=>{
    User.deleteOne({email: req.params.email},(err,response)=>{
        res.status(201).json({
            msg: 'user deleted!',
            response: response
        });
    });
})
module.exports = router;
