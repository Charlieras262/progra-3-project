const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/teacher.controller');

// Obtener Cursos
router.get('/', /*passport.authenticate('jwt', {session:false}),*/ controller.getTeachers);
// Obtener Curso por id
router.get('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.getTeacher);
// Crear Curso
router.post('/', /*passport.authenticate('jwt', {session:false}),*/ controller.createTeacher);
// Actualizar curso
router.put('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.updateTeacher);
// Eliminar Curso
router.delete('/:id', /*passport.authenticate('jwt', {session:false}),*/ controller.deleteTeacher);

module.exports = router;