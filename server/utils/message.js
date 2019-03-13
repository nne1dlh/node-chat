var moment = require('moment');

var genMessagePiss = (from, text) => {
    return {
        from: from,
        text,
        createdAt: moment().valueOf()
    };
};
var generateLocationMessages = (from, lat, long) =>{
    return {
        from, 
        url: `https://www.goggle.com/maps?q=${lat},${long}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {genMessage: genMessagePiss, genLocMess: generateLocationMessages};