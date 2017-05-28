var uniq = require('uniq');
var p = prompt('enter some sequence separated by comma. Does the minification pipeline work?').split(',');
console.log(uniq(p));
