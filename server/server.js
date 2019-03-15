const socketIO = require('socket.io');
const path = require('path');
const xpress = require('express');
const http = require('http');
const generateMessage = require('./utils/message').genMessage;
const generateLocationMessage = require('./utils/message').genLocMess;
const isRealString = require('./utils/validate').isRealString;
const {Users} = require('./utils/users');

var app = xpress();
var serwer = http.createServer(app);
var io = socketIO(serwer);
var users = new Users();
const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;

app.use(xpress.static(publicPath));

io.on('connection', (socket)=> {
    console.log('new user connected');

    

    socket.on('join', (params, cb) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return cb('Name and room name are required..');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        //socket.leave('The walking Dead Fans');
        //io.emit -emit to everyone 
        //socket.broadcast -emit to everyone except current user
        //socket.emit - emit to one specific user

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('ADmin', `${params.name} has joined chatters`));
        cb();
    });

    socket.on('createMessage', (mess, cb) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(mess.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.fname, mess.text)); //emits event to every connection

        }

        
        cb();
    });

    socket.on('createLocMess', (coords) => {
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocMessage', generateLocationMessage(user.fname, coords.lat, coords.long));
        }


        
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.fname} has left chat room`) );
        }

    });
});

serwer.listen(port, () => {
    console.log(`erver is litening on port ${port}`);
});