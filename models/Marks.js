const mongoose = require('mongoose');
const Joi = require('joi');

function marks_validation(mark) {
    const joi_marks_schema = Joi.object
        ({
            // user_id: Joi.string().required().min(3).max(120),
            quizMarks : Joi.string().required().min(3).max(120),
            finalMarks : Joi.string().required().min(3).max(120)
            
            //  description:Joi.string(),
        })
    return result = joi_marks_schema.validate(mark);
}

const marks_schema = new mongoose.Schema
    ({
        teacher_id: {
            type: mongoose.Schema.Types.ObjectId
        },
        student_id:{
            type: mongoose.Schema.Types.ObjectId
        },
       name:
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
     
        

        
    })

 

const Course = mongoose.model('Course', courses_schema);
module.exports.Course = Course;
module.exports.courses_validation = courses_validation;

