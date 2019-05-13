const express = require('express');
const router = express.Router();
const passport = require('passport')

const student = require('../controllers/student.controller');

router.get('/amount', student.getStudentsAmount);
router.get('/', passport.authenticate('jwt', { session: false }), student.getStudents);
router.get('/:id', passport.authenticate('jwt', { session: false }), student.getStudent);
router.post('/', passport.authenticate('jwt', { session: false }), student.createStudent);
router.put('/:id', passport.authenticate('jwt', { session: false }), student.editStudent);
router.delete('/:id', passport.authenticate('jwt', { session: false }), student.deleteStudent);

module.exports = router;