const express = require('express');
const Joi = require('joi');
const { teacher_validation, Teacher } = require('../models/teacher');
const {courses_validation , Course } = require('../models/courses');
const router = express.Router();
const fs = require('fs');



//-----     signup     ------//
router.post('/signup', async (req, res) => {
    const result = teacher_validation(req.body);
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    let teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
        return res.json
            ({
                success: false,
                message: "Email alreay registerd",
            })
    }
    try {
        const new_teacher = new Teacher
            ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password,
                city: req.body.city,
                address: req.body.address,
            })
        const teacher = await new_teacher.save();
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


// Teacher will log in to the system . 
router.post('/login', async (req, res) => {
    const result = logInValidation(req.body);
    if (result.error != null) {
        return res.json({
            success: false,
            status: 400,
            message: result.error.details[0].message
        })
    }
    try {
        var get_tailor = await Teacher.findOne({
            email: { $regex: "^" + req.body.email, $options: 'i' },
            password: req.body.password
        })
        if (!get_tailor) {
            return res.json
                ({
                    success: false,
                    message: "user or password incorrect....",
                    status: 400
                })
        }
        if (get_tailor) {
            return res.json
                ({
                    success: true,
                    data: get_tailor,
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


router.get('/all_teachers', async (req, res) => {
    const get_all_teachers = await Teacher.find()
    if (get_all_teachers == null)
        return res.json
            ({
                success: false,
                error: "user does not exist",
            })
    if (get_all_teachers != null)
        return res.json
            ({
                success: true,
                data: get_all_teachers,
            })
})

//get all courses

router.get('/all_courses', async (req, res) => {
    const get_all_course = await Course.find()
    if (get_all_course == null)
        return res.json
            ({
                success: false,
                error: "courses does not exist",
            })
    if (get_all_course != null)
        return res.json
            ({
                success: true,
                data: get_all_course,
            })
})



//-----    post a new trend      ------//
router.post('/add_teacher_course', async (req, res) => {
    console.log("Allah U Akbar")
    try {
        var get_teacher = await Teacher.findOne({
            _id: req.body.teacher_id,
        })
        console.log(get_teacher)
        if (!get_teacher) {
            return res.json
                ({
                    success: false,
                    message: "user not found",
                    status: 400
                })
        }
        if (get_teacher) {
            const new_course = new Course
                ({
                    teacher_id: req.body.teacher_id,
                    name: req.body.name,
                    teacher_first_name : get_teacher.first_name,
                    teacher_last_name : get_teacher.last_name
                })
            const course = await new_course.save();
         
            return res.json
                ({
                    success: true,
                    message: "Course added ",
                    data: course,
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


//all courses by a specific teacher 

router.get('/all_courses_by_single_teacher/:teacher_id', async (req, res) => {
    const get_courses = await Course.find({ teacher_id: req.params.teacher_id })
    console.log(get_courses)
    if (get_courses.length == 0)
        return res.json
            ({
                success: false,
                error: "No course by this teacher",
            })
    if (get_courses.length > 0)
        return res.json
            ({
                success: true,
                data: get_courses,
            })
})



function logInValidation(teachers) {
    const teachers_schema = Joi.object
        ({
            email: Joi.string().email().required().min(3).max(120),
            password: Joi.string().min(6).max(30).required(),
        })
    return teachers_schema.validate(teachers)
}


module.exports = router;
