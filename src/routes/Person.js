const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authorize = require('./authorize');
const PersonRepository = require('../repository/PersonRepository');
const PersonValidator = require('../validations/PersonValidator')
const Person = require('../models/Person');

/**
 * @typedef PersonAuth
 * @property {string} email.required - email - eg: rafael.dias@gmail.com
 * @property {string} password.required - senha - eg: 123456
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /person/auth
 * @group person - Operations about user
 * @param {PersonAuth.model} person.body.required
 * @returns {object} 200 - An array of user 
 * @returns {Error}  default - Unexpected error
 */
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


/**
 * This function comment is parsed by doctrine
 * @route GET /person
 * @group person - Operations about user
 * @param {string} Authorization.header.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('', authorize, async (req, res) => {
    let result = await PersonRepository.Get();
    res.json(result);
});


/**
 * @typedef Person
 * @property {string} name.required - nome - eg: rafaeldias
 * @property {string} email.required - email - eg: rafael.dias@gmail.com
 * @property {string} password.required - password - eg: 123456
 * @property {string} birthday.required - birthday - eg: 1997-03-24
 * @property {integer} sexo.required - birthday - eg: 1
 * @property {string} description.required
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /person
 * @group person - Operations about user
 * @param {Person.model} person.body.required - the new point
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('', PersonValidator.Create, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let person = new Person(req.body);
    let result = await PersonRepository.Post(person);
    res.json(result);
});

/**
 * @typedef PersonPUT
 * @property {string} _id.required - nome - eg: rafaeldias
 * @property {string} name.required - nome - eg: rafaeldias
 * @property {string} email.required - email - eg: rafael.dias@gmail.com
 * @property {string} password.required - password - eg: 123456
 * @property {string} birthday.required - birthday - eg: 1997-03-24
 * @property {integer} sexo.required - birthday - eg: 1
 * @property {string} description.required
 */

/**
 * This function comment is parsed by doctrine
 * @route PUT /person
 * @group person - Operations about user
 * @param {string} Authorization.header.required
 * @param {PersonPUT.model} personPUT.body.required - the new point
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.put('', PersonValidator.Edit, authorize, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    console.log(req.body)
    let result = await PersonRepository.Put(req.body._id, req.body);
    res.json(result);
});

module.exports = router;
