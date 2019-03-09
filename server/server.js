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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (mess) => {
        console.log('createMessage', mess);
        io.emit('newMessage', {
            from: mess.from,
            text: mess.text,
            createdAt: new Date().getTime()
        }); //emits event to every connection
    
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