const User = require('../models/User');
const generalValidations = require('./validations/general.validation');
const UserController = {};

/**
 * Este metodo obtiene todos los usuarios de la base de datos
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje
 * y un arreglo de usuarios si existen.
 */
UserController.getUsers = async (req, res) => {
  const user = await User.find();
  if (user.length === 0) res.json({status: false, msg: 'Users not found'});
  else res.json({status: true, msg: 'Users found', user});
};

/**
 * Este metodo obtiene un usuario filtrado por id
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje y un usuario si existe.
 */
UserController.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) res.json({status: false, msg: 'User not found'});
  else res.json({status: true, msg: 'User found', user});
};


/**
 * Este medotodo guarda un usuario en la base de datos
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje.
 */
UserController.createUser = async (req, res) => {
  const user = new User(req.body);
  const authRes = authUserInfo(user);
  if (authRes.success) {
    await user.save();
    res.json({status: true, msg: 'User created'});
  } else {
    res.json(authRes);
  }
};

/**
 * Este metodo actualiza la informacion de un usuario en la base de datos
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje.
 */
UserController.updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({status: true, msg: 'User updated'});
};

/**
 * Este metodo elimina a un usuario de la base de datos
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje y un usuario si existe.
 */
UserController.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({status: true, msg: 'User deleted'});
};

const authUserInfo = (user) => {
  const names = ['Name', 'Last Name', 'Username', 'Email', 'Password'];
  // Se convierte un objeto http a string,
  // luego a JSON y por ultimo a un arreglo
  user = Object.values(JSON.parse(JSON.stringify(user)));
  let res;
  for (let i = 1; i < (user.length); i++) {
    res = generalValidations.isFilled(user[i], names[i-1]);
    if (!res.success) return res;
  }
  return {success: true, msg: 'Everything is clear'};
};

// Se exporta el controllador para poder utilizarlo en las rutas
module.exports = UserController;
