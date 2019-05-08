const User = require('../models/User');
const generalValidations = require('./validations/general.validation');
const UserController = {};
const Validations = require('./validations/general.validation');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

/**
 * Este metodo obtiene la informacion del perfil de un usuario
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje
 * y un usuario.
 */
UserController.getProfile = async (req, res) => {
  const user = await User.find();
  if (user.length === 0) res.json({success: false, msg: 'Users not found'});
  else res.json({success: true, msg: 'Users found', user});
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
  if (!user) res.json({success: false, msg: 'User not found'});
  else res.json({success: true, msg: 'User found', user});
};


/**
 * Este medotodo guarda un usuario en la base de datos
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje.
 */
UserController.createUser = async (req, res) => {

  var hashData = Validations.saltHashPassword(req.body.password);

  const userModel = {
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashData.passwordHash,
    salt: hashData.salt,
    type: req.body.type
  }
  const user = new User(userModel)
  const authRes = authUserInfo(user);
  if (authRes.success) {
    User.findOne({email: userModel.email}).countDocuments((err, number) => {
      if (number !== 0) {
        res.json({success: false, msg: 'The email is already used.'});
      }else{
        user.save();
        res.json({success: true, msg: 'User created'});
      }
    });
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
  const user = new User(req.body);
  const authRes = authUserInfo(user);
  if (authRes.success) {
    await User.findByIdAndUpdate(req.params.id, user);
    res.json({success: true, msg: 'User updated'});
  } else {
    res.json(authRes);
  }
};

/**
 * Este metodo elimina a un usuario de la base de datos
 * @param {*} req es el requerimiento que envia el front end al servidor.
 * @param {*} res es la respuesta que envia el servidor al front end.
 * @return {JSON} un json con un estado, un mensaje y un usuario si existe.
 */
UserController.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({success: true, msg: 'User deleted'});
};

var valEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return {
      success: false,
      msg: 'Email Format is incorrect: abc123@abc.com. '
    };
  } else {
    return {
      success: true,
      msg: 'Email Valid'
    };
  }
}

UserController.authUserInfo = (req, res) => {
  const userModel = {
    email: req.body.email,
    password: req.body.password
  }
  var emailR = Validations.isFilled(userModel.email, "Email");
  var passR = Validations.isFilled(userModel.password, "Password");
  if(!emailR.success) return res.json(emailR);
  emailR = valEmail(userModel.email);
  if(!emailR.success) return res.json(emailR);
  if(!passR.success) return res.json(passR);
  User.getUserByEmail(userModel.email, (err, user) => {
    if(err) throw err;
    if(!user){
      res.json({
        success: false,
        msg: 'User not found!!, Please check the email'
      });
    }else{
      var userJSON = JSON.parse(JSON.stringify(user));
      var salt = userJSON.salt
      var hashedUserPassword = Validations.checkHashPassword(userModel.password, salt).passwordHash;
      if(hashedUserPassword === userJSON.password){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          msg: 'Login success',
          token: 'JWT ' + token,
          user: {
            username: userJSON.username, 
            email: userJSON.email,
            type: userJSON.type
          }
        });
      }else{
        res.json({
          success: false,
          msg: 'Wrong Password!!!'
        });
      }
    }
  });
}

const authUserInfo = (user) => {
  const names = ['Name', 'Last Name', 'Username', 'Email', 'Password'];
  // Se convierte un objeto http a string,
  // luego a JSON y por ultimo a un arreglo
  var userJSON = JSON.parse(JSON.stringify(user));
  user = Object.values(userJSON);
  let res;
  
  for (let i = 1; i < (user.length); i++) {
    res = generalValidations.isFilled(user[i], names[i-1]);
    if (!res.success) return res;
  }

  var email = valEmail(userJSON.email);
  
  if(email.success === false){
    return email;
  }
  return {success: true, msg: 'Everything is clear'};
};

// Se exporta el controllador para poder utilizarlo en las rutas
module.exports = UserController;


/*{
	"name":"Carlos René",
	"lastname":"Ramos López",
	"username":"Charlie262",
	"email":"charlyras262@gmail.com",
	"password":"1234",
	"type":"U"
}*/