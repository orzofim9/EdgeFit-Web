const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetails");

// add user details to db on user sign up
router.post("/signup", (req, res, next)=>{
        const userDetails = new UserDetails({
            email: req.body.email,
            role: "guest",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            city: req.body.city,
            address: req.body.address,
            phone: req.body.phone
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

// get user details given email
router.get('/getUserDetails/:email',function(req,res,next){
    UserDetails.find({email: req.params.email},function(err, user){
        res.status(200).json(user);

    });
});

// update userdetails given email
router.post('/updateDetails/:email',function(req,res){
    UserDetails.updateOne({ email: req.params.email },{ firstName: req.body.firstName, lastName: req.body.lastName, 
     city: req.body.city, address: req.body.address, phone: req.body.phone }, function(err,response){
        res.status(201).json({
         msg: "user updated!",   
         response: response
        })
    });
});

// get all users from db
router.post('/usersList', function(req, res) {
    let query = {}
    req.body.firstName? query.firstName=req.body.firstName:null;
    req.body.lastName? query.lastName=req.body.lastName:null;
    req.body.city? query.city=req.body.city:null;

    UserDetails.find(query,(err,users)=>{
        res.status(200).json(users);
    });
});


// Delete user given email
router.get('/deleteUser/:email',(req,res)=>{
    UserDetails.deleteOne({email: req.params.email},(err,response)=>{
        res.status(201).json({
            msg: 'user Details deleted!',
            response: response
        });
    });
});

router.get('/getUserRole/:email',(req,res)=>{
    UserDetails.find({email: req.params.email},function(err, user){
        res.status(200).json(user[0].role);
    });
});

router.post('/editUserRole/:email',(req,res)=>{
    UserDetails.updateOne({ email: req.params.email },{ role: req.body.role }, function(err,response){
           res.status(201).json({
            msg: "user's role updated!",   
            response: response
           })
       });
})
module.exports = router;
