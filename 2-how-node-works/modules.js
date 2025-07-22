// Shows the variables/code a modules wraps in it.
// console.log(arguments, '\n');

// Shows the template node.js uses for the function 
// that wraps up our modules.
// console.log('Wrapping function sign \n', require('module').wrapper);

//////////////////

// module.exports
const Calculator = require('./test-module-1');
const calc1 = new Calculator();

console.log(calc1.add(2, 5));
console.log('\n');

// exports
// const calc2 = require('./test-module-2');
const {add, multiply, divide} = require('./test-module-2');

// console.log(calc2.add(2, 5));
console.log(add(2, 5));
console.log(multiply(3, 7));
console.log(divide(12, 6));
console.log('\n');

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
console.log('--OMG! Caching magic 🪄');