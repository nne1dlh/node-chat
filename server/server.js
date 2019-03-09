
const path = require('path');
const xpress = require('express');

var app = xpress();

const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

app.use(xpress.static(publicPath));

app.listen(port, () => {
    console.log(`erver is litening on port ${port}`);
});