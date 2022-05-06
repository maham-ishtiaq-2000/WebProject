const mongoose = require('mongoose');
const Joi = require('joi');

function student_validation(student) {
    const joi_student_schema = Joi.object
        ({
            first_name: Joi.string().required().min(3).max(120),
            last_name: Joi.string().required().min(3).max(120),
            email: Joi.string().email().required().min(3).max(120),
            contact: Joi.number().min(11).required(),
            password: Joi.string().min(6).max(1024).required(),
            city: Joi.string().min(2).max(1024),
            address: Joi.string().min(2).max(1024),
            class: Joi.string().min(2).max(1024),
            roll_number: Joi.string().min(1).max(1024),
            //images: Joi.string().min(2).max(1024),
        })
    return result = joi_student_schema.validate(student);
}

const student_schema = new mongoose.Schema
    ({
        first_name:
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
        last_name:
        {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        contact:
        {
            type: Number,
            minlength: 11,
            maxlength: 11,
        },
        password:
        {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1040
        },
        city:
        {
            type: String,
            required: true,
        },
        address:
        {
            type: String,
            required: true,
        },
        roll_number:
        {
            type: String,
            required: true,
        },
        class:
        {
            type: String,
            required: true,
        },
        randomString:
        {
            type: String,
        },
        email_varification:
        {
            type: Boolean,
            default: false
        },

        redirection_link:
        {
            type: String,
            default: "https://www.google.com",
        },
      
       
      
       

       
    })

const Student = mongoose.model('Sudent', student_schema);
module.exports.Student = Student;
module.exports.student_validation = student_validation;

