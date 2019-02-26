const User = require('../models/User')
const UserController = {}

/**
 * @argument req es el requerimiento que envia el front end al servidor
 * @argument res es la respuesta que envia el servidor al front end
 */
UserController.getUser = async(req, res) => {
    const user = await User.find()
    if(user.length === 0) res.json({status: 'Error', msg: 'User not found'})
    else res.json({status: 'Success', msg:'Users found', user})
    
}

//Se exporta el controllador para poder utilizarlo en las rutas
module.exports = UserController