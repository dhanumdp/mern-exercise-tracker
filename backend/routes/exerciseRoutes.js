const express = require('express')
const router = express.Router();
const Exercise = require('../models/exercise.model');

router.get('/list',(req,res)=>{
    Exercise.find({}).then((exercises)=>{
        res.send({success:true, message : "Exercises retrieved successfully", Exercises : exercises})
    }).catch((err)=>{
        res.send({success:false, message:"Error while retrieving exercises "+err});
    })
})


router.post('/addExercise',(req,res)=>{

  
    const newExercise = new Exercise(req.body);
    newExercise.save().then(()=>{
        res.send({success:true, message: "Exercise Added Successfully"})
    }).catch((err)=>{
        res.send({success:false, message:"Error while adding Exercise "+err})
    })
})

router.get('/list/:id',(req,res)=>{
    Exercise.findById(req.params.id).then((exercise)=>{
        res.send({success:true, message : "Exercise retrieved successfully", Exercise : exercise    })

    }).catch((err)=>{
        res.send({success:false, message:"Error while retrieving exercise "+err});

    })
})

router.delete('/delete/:id',(req,res)=>{
    Exercise.findByIdAndDelete(req.params.id).then((exercise)=>{
        res.send({success:true, message : "Exercise Deleted successfully"})

    }).catch((err)=>{
        res.send({success:false, message:"Error while Deleting exercise "+err});

    })
})

router.put('/update/:id',(req,res)=>{
    Exercise.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then((exercise)=>{
        res.send({success:true, message : "Exercise Updated successfully", Exercise : exercise})
    }).catch((err)=>{
        res.send({success:false, message:"Error while Updating exercise "+err});

    })
})


module.exports=router;