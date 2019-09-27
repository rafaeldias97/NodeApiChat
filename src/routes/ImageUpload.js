const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer.js');
const PersonRepository = require('../repository/PersonRepository');
const RoomRepository = require('../repository/RoomRepository');
const fs = require('fs');
const authorize = require('./authorize');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const RoomValidator = require('../validations/RoomValidator');


/**
 * This function comment is parsed by doctrine
 * @route POST /image/perfil/upload
 * @group image - Operations about user
 * @consumes multipart/form-data
 * @param {file} file.formData.required
 * @param {string} Authorization.header.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.post('/perfil/upload', multer(multerConfig).single('file'), authorize, async (req, res) => {
    let id = jwt.decode(req.headers.authorization.replace("Bearer ", ""))._id

    let result = await PersonRepository.Put(id, { profileURL: req.file.filename });
    if (result === null) fs.unlinkSync(req.file.path);

    return res.json(req.file);
});

/**
 * This function comment is parsed by doctrine
 * @route POST /image/room/upload
 * @group image - Operations about user
 * @consumes multipart/form-data
 * @param {file} file.formData.required
 * @param {string} Authorization.header.required
 * @param {string} roomId.query.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
router.post('/room/upload', multer(multerConfig).single('file'), authorize, RoomValidator.Upload, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let result = await RoomRepository.Put(req.query.roomId, { imageURL: req.file.filename });
    if (result === null) fs.unlinkSync(req.file.path);

    return res.json(req.file);
});

module.exports = router;