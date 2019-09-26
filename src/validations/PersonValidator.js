const { check } = require('express-validator');

let Auth = [
    check('email')
        .not().isEmpty()
        .withMessage('Email é obrigatório')
        .custom((el) => validateEmail(el))
        .withMessage('Email inválido'),
    check('password')
        .not().isEmpty()
        .withMessage('Senha é obrigatório')
]

let Create = [
    check('name')
        .not().isEmpty()
        .withMessage('Nome é obrigatório'),
    check('email')
        .not().isEmpty()
        .withMessage('Email é obrigatório')
        .custom((el) => validateEmail(el))
        .withMessage('Email inválido'),
    check('password')
        .not().isEmpty()
        .withMessage('Senha é obrigatório'),
    check('birthday')
        .not().isEmpty()
        .withMessage('Data de nascimento é obrigatório'),
    check('birthday')
        .not().isNumeric()
        .withMessage('Sexo é obrigatório')
]

let Edit = [
    check('_id')
        .not().isEmpty()
        .withMessage('id é obrigatório')
]
Edit.push(Create)

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    Auth,
    Create,
    Edit
}