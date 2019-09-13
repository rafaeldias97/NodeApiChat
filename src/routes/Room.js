const express = require('express');
const router = express.Router();

const { RoomRepository } = require('../repository/RoomRepository');
const Room = require('../models/Room');

router.get('', async (req, res) => {
    let result = await RoomRepository.Get();
    res.json(result);
});

router.post('', async (req, res) => {
    let person = new Room(req.body);
    let result = await RoomRepository.Post(person);
    res.json(result);
});

router.put('', async (req, res) => {
    let person = new Room(req.body);
    let result = await RoomRepository.put(person);
    res.json(result);
});

router.delete('', async (req, res) => {
    let person = new Room(req.body);
    let result = await RoomRepository.delete(person);
    res.json(result);
});

module.exports = router;