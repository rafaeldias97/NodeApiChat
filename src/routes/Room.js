const express = require('express');
const router = express.Router();
const authorize = require('./authorize');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const RoomValidator = require('../validations/RoomValidator');

const RoomRepository = require('../repository/RoomRepository');
const Room = require('../models/Room');

/**
 * This function comment is parsed by doctrine
 * @route GET /room
 * @group room - Sala de Bate Papo
 * @param {string} Authorization.header.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.get('', authorize, async (req, res) => {
    let result = await RoomRepository.Get();
    res.json(result);
});

/**
 * This function comment is parsed by doctrine
 * @route GET /room/your
 * @group room - Sala de Bate Papo
 * @param {string} Authorization.header.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.get('/your', authorize, async (req, res) => {
    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let result = await RoomRepository.Get({ idUser: id });
    res.json(result);
});


/**
 * @typedef RoomPost
 * @property {string} name.required
 * @property {string} description.required
 * @property {string} linkVideo.required
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /room
 * @group room
 * @param {string} Authorization.header.required
 * @param {RoomPost.model} roomPost.body.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.post('', authorize, RoomValidator.Create, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let room = new Room(req.body);
    room.idUser = id;
    let result = await RoomRepository.Post(room);
    res.json(result);
});

/**
 * @typedef RoomPut
 * @property {string} _id.required
 * @property {string} name.required
 * @property {string} description.required
 * @property {string} linkVideo.required
 */
/**
 * This function comment is parsed by doctrine
 * @route PUT /room
 * @group room
 * @param {string} Authorization.header.required
 * @param {RoomPut.model} roomPut.body.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.put('', authorize, RoomValidator.Edit, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let room = req.body;
    let result = await RoomRepository.Put(room._id, room);
    res.json(result);
});

/**
 * This function comment is parsed by doctrine
 * @route DELETE /room/{_id}
 * @group room
 * @param {string} Authorization.header.required
 * @param {string} _id.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:_id', RoomValidator.Delete, authorize, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let result = await RoomRepository.Delete(req.params._id);
    res.json(result);
});

module.exports = router;