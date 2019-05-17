const validation = {};
const config = require('../../config/database');
const CryptoJS = require('crypto-js');
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');

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
        return { success: false, msg: `The field "${nameFiel}" is empty` };
    } else {
        return { success: true, msg: `The field is filled` };
    }
};

validation.decrypt = (str) => {
    var bytes = CryptoJS.AES.decrypt(str, config.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

validation.generateVerifyCode = async(type) => {
    let code = Math.round(Math.random() * (9999 - 1000) + 1000);
    switch (type) {
        case 'E':
            while (await Student.findOne({ val_code: `E-${code}` }).countDocuments() > 0) {
                code = Math.round(Math.random() * (9999 - 1000) + 1000);
            }
            break;
        case 'P':
            while (await Teacher.findOne({ val_code: `P-${code}` })) {
                code = Math.round(Math.random() * (9999 - 1000) + 1000);
            }
        default:
            break;
    }
    return `${type}-${code}`;
}

validation.generateStudentCode = async(inst) => {
    const date = new Date();
    let code = Math.round(Math.random() * (99999 - 100) + 100);
    while (await Student.findOne({ _id: `${inst}-${date.getFullYear()}-${code}` }).countDocuments() > 0) {
        code = Math.round(Math.random() * (99999 - 100) + 100);
    }
    return `${inst}-${date.getFullYear().toString().substr(2, 2)}-${code}`;
}

module.exports = validation;