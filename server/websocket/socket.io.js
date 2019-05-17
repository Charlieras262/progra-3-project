let users = {}
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('connected', data => {
            socket.nickname = data;
            io.sockets.emit('getUsername', data);
            users[socket.nickname] = socket;
            console.log('User ' + data + ' Connected');
        });
        socket.on('getUsername', (data) => {
            io.sockets.emit('getUsername', data);
        });
    });
}