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
            Course.populate(course, {path: 'score'}, (err, score) => {
                if (err) throw err;
                res.json(course);
            });
        }
    });
}

CourseController.getCourse = async (req, res) => {
    await Course.findById(req.params.id).populate({
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
            Course.populate(course, {path: 'score'}, (err, score) => {
                if (err) throw err;
                res.json(course);
            });
        }
    });
}

CourseController.createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({
        status: 'Course created'
    });
}


CourseController.updateCourse = async (req, res) => {
    const course = new Course(req.body);
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
