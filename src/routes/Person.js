const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { PersonRepository } = require('../repository/PersonRepository');
const PersonValidator = require('../validations/PersonValidator')
const Person = require('../models/Person');

router.post('/auth', PersonValidator.Auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let person = req.body;
    let result = await PersonRepository.GetBy({ email: person.email, password: person.password });

    let exp = new Date(Date.now());
    exp.setHours(exp.getHours() + 2);

    let _jwt = jwt.sign({
        _id: result._id.toString(),
        iss:"tubedownload.com.br",
        expire: parseInt(exp.getTime()),
    }, "dd%88*337f6d&fJAFAS**$#&dfasd)@E#sjdis")
    res.json(_jwt);
});

router.get('', async (req, res) => {
    let result = await PersonRepository.Get();
    res.json(result);
});

router.post('', async (req, res) => {
    let person = new Person(req.body);
    let result = await PersonRepository.Post(person);
    res.json(result);
});

router.put('', async (req, res) => {
    let person = new Person(req.body);
    let result = await PersonRepository.put(person);
    res.json(result);
});

router.delete('', async (req, res) => {
    let person = new Person(req.body);
    let result = await PersonRepository.delete(person);
    res.json(result);
});

module.exports = router;
