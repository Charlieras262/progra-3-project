const User = require('../models/User')
const UserController = {}

/**
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje y un arreglo de usuarios si existen.
 */
UserController.getUsers = async(req, res) => {
    const user = await User.find()
    if(user.length === 0) res.json({
        status: false, 
        msg: 'Users not found'
    })
    else res.json({
        status: true, 
        msg:'Users found', 
        user})
}

/**
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
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje.
 */
UserController.createUser = async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({
        status: true,
        msg: 'User created'
    });
}

/**
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje.
 */
UserController.updateUser = async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({
        status: true, 
        msg:'User updated'
    })
}

/**
 * @argument req es el requerimiento que envia el front end al servidor.
 * @argument res es la respuesta que envia el servidor al front end.
 * @returns un json con un estado, un mensaje y un usuario si existe.
 */
UserController.deleteUser = async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({
        status: true, 
        msg:'User deleted'
    })
}

//Se exporta el controllador para poder utilizarlo en las rutas
module.exports = UserController