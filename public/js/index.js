
        
    var socket = io();

    socket.on('connect', function () {
        console.log('Connected to server');

    });
   
   
    socket.on('disconnect', () => {
        console.log('Disconnected form server');
    });
    
    socket.on('newMessage', function(mess) {
        console.log("new message is :",mess);
    });

        