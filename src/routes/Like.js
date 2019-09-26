const express = require('express');
const router = express.Router();
const authorize = require('./authorize');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const LikeValidator = require('../validations/LikeValidator');

const RoomRepository = require('../repository/RoomRepository');
// const Room = require('../models/Room');

/**
 * This function comment is parsed by doctrine
 * @route PUT /like/on/{roomId}
 * @group like
 * @param {string} Authorization.header.required
 * @param {string} roomId.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.put('/on/:roomId', authorize, LikeValidator.LikeUnlike, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let result = await RoomRepository.Put(req.params.roomId, { $addToSet : { like: id }, $pull : { deslike: id }});
    res.json(result);
});

/**
 * This function comment is parsed by doctrine
 * @route PUT /like/off/{roomId}
 * @group like
 * @param {string} Authorization.header.required
 * @param {string} roomId.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.put('/off/:roomId', authorize, LikeValidator.LikeUnlike, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let result = await RoomRepository.Put(req.params.roomId, { $pull: { like: id } });
    res.json(result);
});

/**
 * This function comment is parsed by doctrine
 * @route PUT /like/unlike/on/{roomId}
 * @group like
 * @param {string} Authorization.header.required
 * @param {string} roomId.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.put('/unlike/on/:roomId', authorize, LikeValidator.LikeUnlike, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let result = await RoomRepository.Put(req.params.roomId, { $addToSet : { deslike: id }, $pull : { like: id } });
    res.json(result);
});

/**
 * This function comment is parsed by doctrine
 * @route PUT /like/unlike/off/{roomId}
 * @group like
 * @param {string} Authorization.header.required
 * @param {string} roomId.path.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.put('/unlike/off/:roomId', authorize, LikeValidator.LikeUnlike, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id
    let result = await RoomRepository.Put(req.params.roomId, { $pull: { deslike: id } });
    res.json(result);
});

module.exports = router;