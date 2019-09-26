const { check } = require('express-validator');
const RoomRepository = require('../repository/RoomRepository');
const jwt = require('jsonwebtoken');

let Create = [
    check('name')
        .not().isEmpty()
        .withMessage('Nome é obrigatório'),
    check('description')
        .not().isEmpty()
        .withMessage('Descrição é obrigatório')
]

let Edit = [
    check('_id')
        .not().isEmpty()
        .withMessage('Id é obrigatório')
        .custom(async (el, obj) => await verifyUser(el, obj))
        .withMessage('Voce não tem privilegios para esta sala'),
        check('name')
            .not().isEmpty()
            .withMessage('Nome é obrigatório'),
        check('description')
            .not().isEmpty()
            .withMessage('Descrição é obrigatório')
]

let Delete = [
    check('_id')
        .not().isEmpty()
        .withMessage('Id é obrigatório')
        .custom(async (el, obj) => await verifyUser(el, obj))
        .withMessage('Voce não tem privilegios para esta sala'),
        // .custom((el) => verifyUser(el))
        // .withMessage('Voce não tem privilegios para esta sala')
]

const verifyUser = async (_id, obj) => {
    let res = await RoomRepository.GetBy({ _id: _id });
    let id = jwt.decode(obj.req.headers.authorization.replace("Bearer ", ""))._id
    console.log(res.idUser !== id)
    return res.idUser === id ? Promise.resolve() : Promise.reject();
}
module.exports = {
    Create,
    Edit,
    Delete
}