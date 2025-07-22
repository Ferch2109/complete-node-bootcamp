/**
    * Using module.exports to return 
    * only 1 class from the module.
*/

// class Calculator {
//     add(a, b) {
//         return a + b;
//     }

//     multiply(a, b) {
//         return a * b;
//     }

//     divide(a, b) {
//         return a / b;
//     }
// }

//module.exports = Calculator;

/* anonimus class exported from a module. */
module.exports = class {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
}