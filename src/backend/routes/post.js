const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const mongoose = require('mongoose');

router.post("/addPost", (req, res)=>{
    const post = new Post({
        id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    
    post.save().then(result => {
        res.status(201).json({
            message: 'Post Added!',
            result: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/getPosts', function(req, res) {
      Post.find({},(err,users)=>{
          res.status(200).json(users);
      });
});

router.post('/deletePost', function(req,res){
    console.log(req.body);
    Post.deleteOne({_id: req.body._id }, response=>{
        res.status(200).json({
            msg: "Post Deleted!",
            response: response
        });
    });
});

router.post('/getPost', function(req,res){
    console.log(req.body);
    Post.find({_id: req.body._id}, function(err, post){
        res.status(200).json(post);
    });
});

router.post('/updatePost', function(req,res){
    Post.updateOne({_id: req.body._id},{title: req.body.title, content: req.body.content }, function(err,post){
        res.status(200).json({
            msg: 'post updated!',
            response: post
        });
    });
});


module.exports = router;
