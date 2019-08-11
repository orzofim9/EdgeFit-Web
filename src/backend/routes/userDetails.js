const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetails");

router.post("/signup", (req, res, next)=>{
        const userDetails = new UserDetails({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            lastName: req.body.lastName,
            birthday: req.body.birthday
        });
        userDetails.save().then(result => {
            res.status(201).json({
                message: 'User details added!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/getUserDetails/:email',function(req,res,next){
    UserDetails.find({email: req.params.email},function(err, user){
        res.status(200).json(user);

    });
});

router.get('/usersList', function(req, res) {
    UserDetails.find({}, function(err, users) {
        var userMap = [];
        let userName;
        users.forEach(function(user) {
            userName = user.firstName + " " + user.lastName;
            userMap.push(userName);
        });

        res.status(200).json(userMap);
    });
});

router.post('/updateDetails/:email',function(req,res){
       UserDetails.updateOne({ email: req.params.email },{ firstName: req.body.firstName, lastName: req.body.lastName }, function(err,response){
           res.status(201).json({
            msg: "user updated!",
            response: response
           })
       });
});

router.get('/deleteUser/:email',(req,res)=>{
    UserDetails.deleteOne({email: req.params.email},(err,response)=>{
        res.status(201).json({
            msg: 'user Details deleted!',
            response: response
        });
    });
});

module.exports = router;
