var expect = require('expect');

var genMess = require('./message').genMessage;

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