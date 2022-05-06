const mongoose = require('mongoose');
const Joi = require('joi');

function classes_validation(classe) {
    const joi_classes_schema = Joi.object
        ({
           
            class_name: Joi.string().required().min(3).max(120),
           
            //images: Joi.string().min(2).max(1024),
        })
    return result = joi_classes_schema.validate(classe);
}

const classes_schema = new mongoose.Schema
    ({
    
        class_name:
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
        my_students: [{
            student_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            student_first_name:
            {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 120,
            },
            student_last_name:
            {
                type : String,
                required : true,
                minlength : 3,
                maxlength : 120
            },
            student_roll_number:
            {
                type : String,
                required : true,
            }
        }],
        my_courses: [{
            course_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            teacher_id:
            {
                type: mongoose.Schema.Types.ObjectId,
            
            },
            name:
            {
                type : String,
                required : true,
                minlength : 3,
                maxlength : 120
            }
        }],
        class_quizes: [{
            course_name: {
                type : String, 
            },
            student_roll_number:
            {
                type : String,       
             },
            quiz_number :{
                type : String,
            },
            student_first_name :{
                type : String,
            },
            student_last_name :{
                type : String,
            },
            total_marks:{
                 type : String,
            },
            obtained_marks:{
                type : String,
            }
        }],
        class_mid_term: [{
            course_name: {
                type : String, 
            },
            student_roll_number:
            {
                type : String,       
            },
            student_first_name :{
                type : String,
            },
            student_last_name :{
                type : String,
            },
            total_marks:{
                 type : String,
            },
            obtained_marks:{
                type : String,
            }
        }],

        
    })

const Class = mongoose.model('Class', classes_schema);
module.exports.Class = Class;
module.exports.classes_validation = classes_validation;

