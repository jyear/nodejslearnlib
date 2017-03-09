var fs = require('fs');
var path = require('path');

// var p=__dirname+'\\..';
// console.log(path.normalize(p));
// console.log(path.normalize('d:\\..'));

var p = __dirname, f = "config.json", s = '', arr = [];
p.split(path.sep).forEach(function (element, i) {
    s += element + path.sep;
    arr.unshift(path.join(s, f));
});

console.log(arr)