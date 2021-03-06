const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetails");
var createCountMinSketch = require("count-min-sketch")



const set_city = new Set();

// add user details to db on user sign up
router.post("/signup", (req, res, next)=>{
        lat = Math.random() + 32;
        lng = Math.random() + 34;
        const userDetails = new UserDetails({
            email: req.body.email,
            role: "guest",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            city: req.body.city,
            address: req.body.address,
            phone: req.body.phone,
            lat: Math.random() * (32.308129-32.133508) + 32.133508,
            lng: Math.random() * (34.960570-34.847565) + 34.847565
        });
        userDetails.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'User details added!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });
});

// get user details given email
router.get('/getUserDetails/:email',function(req,res,next){
  console.log("here");
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
        });
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

router.get('/getCitySegmentation',(req,res)=>{
  var sketch = createCountMinSketch();
  UserDetails.find({},(err,users)=>{
      for(var i = 0 ; i<users.length;i++){
        set_city.add(users[i].city);
       sketch.update(users[i].city,1);
      }
      response=[];
      for(let city of set_city){
        response.push([city , sketch.query(city)]);
      }

      res.status(200).json(response)
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
