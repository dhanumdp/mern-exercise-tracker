const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({

    Username : {type : String, required : true},
    Description : {type : String, required : true},
    Duration : {type : Number, required : true},
    Date : {type : Date, required : true},

},{timestamps :true});

const Exercise = mongoose.model('Exercises',ExerciseSchema);

module.exports = Exercise;