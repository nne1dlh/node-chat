const socketIO = require('socket.io');
const path = require('path');
const xpress = require('express');
const http = require('http');
const generateMessage = require('./utils/message').genMessage;
var app = xpress();
var serwer = http.createServer(app);
var io = socketIO(serwer);
const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;

app.use(xpress.static(publicPath));

io.on('connection', (socket)=> {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('ADmin', 'New user joined chatters'));

    socket.on('createMessage', (mess, cb) => {
        console.log('createMessage', mess);
        io.emit('newMessage', generateMessage(mess.from, mess.text)); //emits event to every connection
        cb('this is from server...');
    
    // socket.broadcast.emit('newMessage', {
    //     from: mess.from,
    //     text: mess.text,
    //     createdAt: new Date().getTime()
    // });
});

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});

serwer.listen(port, () => {
    console.log(`erver is litening on port ${port}`);
});