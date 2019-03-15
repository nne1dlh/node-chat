const expect = require('expect');
var iRS = require('./validate').isRealString;


describe('isRealString', () => {
    it('should reject non-string values', () =>{
        var res = iRS(98);
        expect(res).toBe(false);
    });

    it('shoud reject string with only spaces', () => {
        var res = iRS('    ');
        expect(res).toBe(false);
    });

    it('should allwo string with non characters', () => {
        var res = iRS('   darren  ');
        expect(res).toBe(true);
    });
});

