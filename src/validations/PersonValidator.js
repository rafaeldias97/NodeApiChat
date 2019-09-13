const { check } = require('express-validator');

let Auth = [
    check('email').not().custom((el) => el.length !== 11).withMessage('Email é obrigatório'),
    check('password').not().isEmpty().withMessage('Senha é obrigatório')
]

module.exports = {
    Auth
}