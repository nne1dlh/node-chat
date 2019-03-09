const socketIO = require('socket.io');
const path = require('path');
const xpress = require('express');
const http = require('http');

var app = xpress();
var serwer = http.createServer(app);
var io = socketIO(serwer);
const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;

app.use(xpress.static(publicPath));

io.on('connection', (socket)=> {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

serwer.listen(port, () => {
    console.log(`erver is litening on port ${port}`);
});