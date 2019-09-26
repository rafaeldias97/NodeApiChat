const Person = require("../models/Person");
const BaseRepository = require("./BaseRepository");
class PersonRepository extends BaseRepository {
    constructor () {
        super(Person)
    }
}

module.exports = new PersonRepository()