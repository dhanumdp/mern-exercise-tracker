const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const User= require('../models/user.model');

router.get('/list',(req,res)=>{
   
    User.find({}).then((users)=>{
         res.send({success : true , message : "Users retrieved Successfully", Users : users})
    }).catch((err)=>{
       res.send({success :false, message : "Error while retrieving users. "+err});

    })
})

router.post('/addUser',(req,res)=>{

    const newUser = new User({
        Username : req.body.Username
    })

    User.find({Username : req.body.Username}).count((err,num)=>{
         
        if(num != 0)
        {
            res.send({success:false, message:req.body.Username+" Already Exists  "})
        }
        else
        {
            newUser.save().then((User)=>{
                res.send({success : true , message : User.Username+" Added Successfully"})
            }).catch((err)=>{
                res.send({success:false, message:"Error while adding "+req.body.Username+" : "+err})
        
            })
        }
    })

    
})

module.exports=router;