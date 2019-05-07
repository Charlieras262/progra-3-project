const validation = {};
var crypto = require('crypto')

/**
 * Este metodo valida si un campo esta lleno o no,
 * y crea un objeto json personalizado para cada campo.
 * @param {Object} data En este parametro se recibe la
 * información para ser validada por el metodo.
 * @param {String} nameFiel es el nombre del campo,
 * este es necesario para crear el mensaje presonalizado.
 * @return {Json} Un objeto json con un estado
 * (true si el parametro data no esta vacio o indefinido,
 * y falso en caso contrario) y un mensaje personalizado.
 */
validation.isFilled = (data, nameFiel) => {
  if (data === undefined || data === ' ' || data === '') {
    return {success: false, msg: `The field "${nameFiel}" is empty`};
  } else {
    return {success: true, msg: `The field is filled`};
  }
};

/**
 * Este metodo crea una cadena aleatoria del tamaño
 * que se le indique.
 * @param {Number} length es el tamaño de la cadena a crear 
 * este es necesario para crear el mensaje presonalizado.
 * @return {String} una cadena de caracteres alectorio,
 * el tamaño depende de lenght.
 */

validation.getRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
      .toString()
      .slice(0, length);
}

/**
 * Este metodo crea un hash sha512 basandose en un salt 
 * (Es una cadena de caracteres aleatorios).
 * @param {String} password es la contraseña que se 
 * desea encriptar.
 * @param {String} salt es una cadena de caracteres 
 * aleatorios en la cual se basa para encriptar 
 * la contraseña.
 * @return {String} un objeto JSON con el salt y el hash
 * de la contraseña.
 */
validation.sha512 = (password, salt) => {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  }
}

validation.saltHashPassword = (userPassword) => {
  var salt = validation.getRandomString(16);
  return passwordData = validation.sha512(userPassword, salt);
}

validation.checkHashPassword = (userPassword, salt) => {
  return validation.sha512(userPassword, salt);
}

module.exports = validation;
