const Room = require("../models/Room")
const BaseRepository = require("./BaseRepository")
class RoomRepository extends BaseRepository {
    constructor () {
        super(Room)
    }
}

module.exports = new RoomRepository()