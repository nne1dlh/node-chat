var moment = require('moment');

//unix epoch Jan 1 1970 00:00:00am 
var dater = moment();
dater.add(3000, 'minute').subtract(1,'day');
console.log('Date:');
console.log(dater.format('MMM Do, YYYY'));

//new Date().getTime()
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));


