const mongoose = require('mongoose');
const Joi = require('joi');

function teacher_validation(teacher) {
    const joi_teacher_schema = Joi.object
        ({
            first_name: Joi.string().required().min(3).max(120),
            last_name: Joi.string().required().min(3).max(120),
            email: Joi.string().email().required().min(3).max(120),
            contact: Joi.number().min(11).required(),
            password: Joi.string().min(6).max(1024).required(),
            city: Joi.string().min(2).max(1024),
            address: Joi.string().min(2).max(1024),
            //images: Joi.string().min(2).max(1024),
        })
    return result = joi_teacher_schema.validate(teacher);
}

const teacher_schema = new mongoose.Schema
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

const Teacher = mongoose.model('Teacher', teacher_schema);
module.exports.Teacher = Teacher;
module.exports.teacher_validation = teacher_validation;

