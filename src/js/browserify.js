var uniq = require('uniq');
var p = prompt('enter some sequence separated by comma. Livereload finished with deferred script load').split(',');
console.log(uniq(p));
