
        
    var socket = io();

    socket.on('connect', function () {
        console.log('Connected to server');

    });
   
   
    socket.on('disconnect', () => {
        console.log('Disconnected form server');
    });
    
    socket.on('newMessage', function(mess) {
        console.log("new message is :",mess);
        var li = jQuery('<li></li>');
        li.text(`${mess.from}: ${mess.text}`);

        jQuery('#messes').append(li);
    });

    jQuery('#mess-form').on('submit', function(e) {
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val()
        }, function() {

        })
    });

        