
    
    var socket = io();

    function scrollToBottom() {
        //selectors
        var messages = jQuery('#messages');
        var newMessage = messages.children('li:last-child');

        //heights
        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();

        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            console.log('should scroll');
            messages.scrollTop(scrollHeight);
        }
    }

    socket.on('connect', function () {
        console.log('Connected to server');
        var params = jQuery.deparam(window.location.search);

        socket.emit('join', params, (err) =>{
            if(err) {
                alert(err);
                window.location.href = '/';
            } else {
                console.log('No error');
            }
        })

    });
   
   
    socket.on('disconnect', () => {
        console.log('Disconnected form server');
    });

    socket.on('updateUserList', function(users) {
        console.log('Users list: ', users);
        var ol = jQuery('<ol></ol>');

        users.forEach(function (user) {
            ol.append(jQuery('<li></li>').text(user))
        });

        jQuery('#users').html(ol);
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
    scrollToBottom();
        
        
        
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
        scrollToBottom();
        
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

        