const init = (server) => {
    const io = require('socket.io')(server)
    var nsp = io.of('/');

    nsp.on('connection', (socket) => {
    // console.log(socket.nsp.name)
        socket.on('GENERATE_ID', (data) => {
            nsp.emit('MESSAGE_id', { id: socket.id, data: data})
        })
        socket.on('SEND_MESSAGE', (data) => {
            nsp.emit('MESSAGE', data)
        })
        socket.on('CREATE_ROOM', (data) => {
            createRoom(socket, nsp, data)
        })
        socket.on('DESTROY_ID', (data) => {
            nsp.emit('MESSAGE_DESTROY', {data: data})
        })
    })
}

const createRoom = (socket, nsp, name) => {
    console.log('chamou')
    socket.on(name, (data) => {
        nsp.emit(`MESSAGE_${name}`, data)
    });
}

module.exports = init;