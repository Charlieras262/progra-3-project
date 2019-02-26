const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller');

/* Peticionnes http al servidor */

// Obtener Usuarios
router.get('/', controller.getUsers)
// Obtener Usuario por id
router.get('/:id', controller.getUser)
// Crear Usuario
router.post('/', controller.createUser);
// Actualizar Usuario
router.put('/:id', controller.updateUser);
// Eliminar Usuario
router.delete('/:id', controller.deleteUser);

// Se exporta el rauter para poder utilizar sus rutas e indexar 
module.exports = router