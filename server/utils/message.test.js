var expect = require('expect');

var genMess = require('./message').genMessage;
var generateLocationMessage = require('./message').genLocMess;

describe('generateMess', () => {
    it('should generate correct message object', () => {
        var from ='Jen';
        var text = 'messy message';
        var message = genMess(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from: from,
            text
        });
   });
});

describe('generateLocationMessage', () => {
    it('should generatecorrect locatin object', () =>{
        var from = 'Donna';
        var lat = 15;
        var long = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from,lat,long);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from: from,
            url
        });
    });
});