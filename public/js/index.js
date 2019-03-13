
        
    var socket = io();

    socket.on('connect', function () {
        console.log('Connected to server');

    });
   
   
    socket.on('disconnect', () => {
        console.log('Disconnected form server');
    });
    
    socket.on('newMessage', function(mess) {
        var formTime = moment(mess.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var htmlp = Mustache.render(template, {
            piss: mess.text,
            from: mess.from,
            createdAt: formTime
    });
    jQuery('#messages').append(htmlp);
        
        
        
        // console.log("new message is :",mess);
        // var formTime = moment(mess.createdAt).format('h:mm a');
        // var li = jQuery('<li></li>');
        // li.text(`${mess.from} ${formTime}: ${mess.text}`);

        // jQuery('#messages').append(li);
    });

    socket.on('newLocMessage', function(message) {
        var formTime = moment(message.createdAt).format('h:mm a');
        var templ = jQuery('#location-message-template').html();
        var htmlPiss = Mustache.render(templ, {
            from: message.from,
            url: message.url,
            createdAt: formTime
        });

        jQuery('#messages').append(htmlPiss);
        
        // var li = jQuery('<li></li>');
        // var a = jQuery('<a target="_blank">My current location</a>');

        // li.text(`${message.from} ${formTime}: `);
        // a.attr('href', message.url);
        // li.append(a);
        // jQuery('#messages').append(li);
    });

    jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();
        var messageTextBox = jQuery('[name=message]');
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function() {
            messageTextBox.val('');
        });
    });

    var locButton = jQuery('#send-loc');
    locButton.on('click', function() {
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by browdser');
        }

        locButton.attr('disabled', 'disabled').text('Sending location....');

        navigator.geolocation.getCurrentPosition(function (position) {
            locButton.removeAttr('disabled').text('Send location success');
            socket.emit('createLocMess', {
                lat: position.coords.latitude,
                long: position.coords.longitude
            });
        }, function () {
            locButton.removeAttr('disabled').text('Send location fail');
            alert('unabel to fetch loction');
        })

    });

        