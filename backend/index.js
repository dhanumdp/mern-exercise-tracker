const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express(); 

require('dotenv').config();


const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log("Server started at port "+port);
})

mongoose.connect("mongodb://localhost:27017/ExerciseTracker",{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
if(!err)    
    console.log("DB Connection Succeeded");
else
    console.log("Error in DB Connection "+err);
})
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
app.use('/users',userRoutes);
app.use('/exercises',exerciseRoutes);


