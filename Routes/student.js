const express = require('express');
const Joi = require('joi');
const { student_validation, Student } = require('../models/students');
const {courses_validation , Course } = require('../models/courses');
const router = express.Router();
const fs = require('fs');



//-----     signup     ------//
router.post('/signup', async (req, res) => {
    const result = student_validation(req.body);
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    let student = await Student.findOne({ email: req.body.email });
    if (student) {
        return res.json
            ({
                success: false,
                message: "Email alreay registerd",
            })
    }
    try {
        const new_student = new Student
            ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password,
                city: req.body.city,
                address: req.body.address,
                class : req.body.class,
                roll_number: req.body.roll_number,
            })
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
//get all students 

router.get('/all_students', async (req, res) => {
    const get_all_students = await Student.find()
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

router.put('/add_course/:course_id/:student_id', async (req, res) => {
    try {
        const get_course = await Course.findOne({ _id: req.params.course_id });
        console.log(get_course._id)

        const add_course = await Student.findOneAndUpdate({ _id: req.params.student_id },
            {
                $push: {
                    my_courses: {
                        course_id: req.params.course_id,
                        teacher_id: get_course.teacher_id,
                        name: get_course.name,
                    }
                }
            },
            { new: true }).select({ my_courses: 1 })

        return res.json
            ({
                success: true,
                message: "Course added to student successfully",
                data: add_course,
            })
    }
    catch (err) {
        return res.status(500).json
            ({
                success: false,
                message: err,
            })
    }
})



 
















module.exports = router;
