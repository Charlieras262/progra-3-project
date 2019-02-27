const User = require('../models/User')
const UserController = {}

/**
 * Este metodo obtiene todos los usuarios de la base de datos
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje y un arreglo de usuarios si existen.
 */
UserController.getUsers = async(req, res) => {
    const user = await User.find()
    if(user.length === 0) res.json({status: false, msg: 'Users not found'})
    else res.json({status: true, msg:'Users found', user})
}

/**
 * Este metodo obtiene un usuario filtrado por id
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje y un usuario si existe.
 */
UserController.getUser = async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user.length === 0) res.json({status: false, msg: 'User not found'})
    else res.json({status: true, msg:'User found', user})
}


/**
 * Este medotodo guarda un usuario en la base de datos
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje.
 */
UserController.createUser = async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({status: true, msg: 'User created'});
}

/**
 * Este metodo actualiza la informacion de un usuario en la base de datos
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje.
 */
UserController.updateUser = async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: true, msg:'User updated'})
}

/**
 * Este metodo elimina a un usuario de la base de datos
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje y un usuario si existe.
 */
UserController.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({status: true, msg:'User deleted'})
}

//Se exporta el controllador para poder utilizarlo en las rutas
module.exports = UserController