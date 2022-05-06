require('dotenv').config()
const express = require('express');
const Joi = require('joi');
const { schoolStudents_validation, schoolStudents } = require('../models/schoolStudents');
const router = express.Router();
const fs = require('fs');
var XLSX = require("xlsx");


//-----     add a student     ------//
router.post('/addAstudent', async (req, res) => {
    const result = schoolStudents_validation(req.body);
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
   
    try {
        const new_student = new schoolStudents
            ({
                tr_code: req.body.tr_code,
                tr_pass: req.body.tr_pass,
                tr_name: req.body.tr_name,
                exam_id: req.body.exam_id,
                std_id: req.body.std_id,
                class: req.body.class,
                sec: req.body.sec,
                subject_code: req.body.subject_code,
                subject_name : req.body.subject_name,
                student_name : req.body.student_name,
                obtained_marks : req.body.obtained_marks,
            })

        const token = await new_student.generateAuthToken();
        console.log(token)
        const student = await new_student.save();

     
          
        return res.json
            ({
                success: true,
                message: "Account registered successfully",
            })
    }
    catch (err) {
        return res.json
            ({
                success: false,
                message: err.message,
            })
    }
})

//login a teacher

router.post('/login', async (req, res) => {
    
    const result = schoolStudents_validation(req.body);
    if (result.error != null) {
        return res.json({
            success: false,
            status: 400,
            message: result.error.details[0].message
        })
    }
    try {
        var get_student = await schoolStudents.findOne({
            tr_code : req.body.tr_code,
            tr_pass : req.body.tr_pass,
            class : req.body.class,
            sec : req.body.sec,
            subject_name : req.body.subject_name
        })
        if (!get_student) {
            return res.json
                ({
                    success: false,
                    message: "something is incorrect....",
                    status: 400
                })
        }
        if (get_student) {
            const token = await get_student.generateAuthToken();
            console.log(token)
            return res.json             
                ({
                    success: true,
                    data: get_student,
                })
        }
    }
    catch (err) {
        return res.json
            ({
                success: false,
                error: err,
            })
    }
})


router.get('/all_school_students/:tr_code/:sec/:subject_name/:class', async (req, res) => {
    const get_all_students = await schoolStudents.find({tr_code : req.params.tr_code , sec : req.params.sec , subject_name : req.params.subject_name , class : req.params.class})
    if (get_all_students == null)
        return res.json
            ({
                success: false,
                error: "user does not exist",
            })
    if (get_all_students != null)
        return res.json
            ({
                success: true,
                data: get_all_students,
            })
})


//get detail of a students of apecific class and subject

router.put('/addMarksofAStudent/:subject_name', async (req, res) => {
    
    try {
        if(req.body.std_id !== "" || req.body.obtained_marks !== ""){
            const add_marks = await schoolStudents.findOneAndUpdate({ std_id : req.body.std_id , subject_name : req.params.subject_name },
                {
                    $set : {obtained_marks : req.body.obtained_marks}
                },
                { new: true }).select({ obtained_marks : 1 })
    
            return res.json
                ({
                    success: true,
                    message: "Marks added",
                    data: add_marks,
                    
                })
        }
        else{
            return res.json
                ({
                    success: false,
                    message: "Student id or obtained marks should not be empty",
                    
                })
        }
       
    }
    catch(err){
        console.log(err)
    }
})


 
module.exports = router;
