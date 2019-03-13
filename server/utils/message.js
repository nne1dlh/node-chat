var genMessagePiss = (from, text) => {
    return {
        from: from,
        text,
        createdAt: new Date().getTime()
    };
};
var generateLocationMessages = (from, lat, long) =>{
    return {
        from, 
        url: `https://www.goggle.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {genMessage: genMessagePiss, genLocMess: generateLocationMessages};