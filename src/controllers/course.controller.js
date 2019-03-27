const Course = require('../models/Course');
const CourseController = {};

CourseController.getCourses = async (req, res) => {
    await Course.find().populate({
        path: 'pensum',
        populate: {
            path: 'unities',
            populate: {
                path: 'subjects',
            }
        }
    }).exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Courses not found' })
        } else {
            return res.json(course);
        }
    });
}

CourseController.getCourse = async (req, res) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'pensum',
        populate: {
            path: 'unities',
            populate: {
                path: 'subjects',
            }
        }
    });
    res.json(course);
}

CourseController.createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({
        status: 'Course created'
    });
}


CourseController.updateCourse = async (req, res) => {
    const course = {
        name: req.body.name,
        cod_course: req.body.cod_course,
        cycle: req.body.cycle,
        section: req.body.section,
        cod_teacher: req.body.cod_teacher
    }
    await Course.findByIdAndUpdate(req.params.id, course);
    res.json({
        status: 'Course Updated'
    });
}

CourseController.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Course Deleted'
    });
}

module.exports = CourseController;