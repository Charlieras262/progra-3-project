const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller');

//Peticionnes http al servidor
router.get('/', controller.getUser)

// Se exporta el rauter para poder utilizar sus rutas e indexar 
module.exports = router