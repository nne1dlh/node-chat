var genMessagePiss = (from, text) => {
    return {
        from: from,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = {genMessage: genMessagePiss};