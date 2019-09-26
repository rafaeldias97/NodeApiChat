const { check } = require('express-validator');

let LikeUnlike = [
    check('roomId ')
        .not().isEmpty()
        .withMessage('Sala é obrigatório'),
]

module.exports = {
    LikeUnlike
}