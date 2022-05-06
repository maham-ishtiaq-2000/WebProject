const mongoose = require('mongoose');
const Joi = require('joi');

function courses_validation(course) {
    const joi_courses_schema = Joi.object
        ({
            // user_id: Joi.string().required().min(3).max(120),
            name: Joi.string().required().min(3).max(120),
            
            
            //  description:Joi.string(),
        })
    return result = joi_courses_schema.validate(course);
}

const courses_schema = new mongoose.Schema
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
        teacher_first_name:
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
        teacher_last_name:
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        }
        

        
    })

 

const Course = mongoose.model('Course', courses_schema);
module.exports.Course = Course;
module.exports.courses_validation = courses_validation;

