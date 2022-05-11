const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

function schoolStudents_validation(schoolStudents) {
    const joi_schoolStudents_schema = Joi.object
        ({
            tr_code: Joi.string(),
            tr_pass: Joi.string(),
            tr_name: Joi.string(),
            exam_id: Joi.number(),
            std_id: Joi.string(),
            class: Joi.string(),
            sec: Joi.string(),
            subject_code: Joi.string(),
            subject_name : Joi.string(),
            student_name : Joi.string(),
            obtained_marks : Joi.string(),
            token : Joi.string(),
            //images: Joi.string().min(2).max(1024),
        })
    return result = joi_schoolStudents_schema.validate(schoolStudents);
}

const schoolStudents_schema = new mongoose.Schema
    ({
        tr_code:
        {
            type: String,
            
            
        },
        tr_pass:
        {
            type: String,
            
        },
        tr_name:
        {
            type: String,
           
        },
        exam_id:
        {
            type: Number,
         
        },
        std_id:
        {
            type: String,
          
          
        },
        class:
        {
            type: String,
          
        },
        sec:
        {
            type: String,
          
        },
        subject_code:
        {
            type: String,
            
        },
        subject_name:
        {
            type: String,
           
        },
        student_name:
        {
            type: String,
        },
        obtained_marks:
        {
            type: String,
        },
        tokens:
        {
            type : String,
        }
        ,
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


schoolStudents_schema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id : this._id.toString()} , process.env.SECRET_KEY , {
            expiresIn : "2 seconds"
        });
        this.tokens = token
        await this.save()
        return token
    }
    catch(err){
        console.log(err)
    }
   
}


    


const schoolStudents = mongoose.model('schoolStudents', schoolStudents_schema);
module.exports.schoolStudents = schoolStudents;
module.exports.schoolStudents_validation = schoolStudents_validation;

