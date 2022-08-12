'use strict'

try {
    console.log('Normal');
    console.log(a);
    console.log('Result')
} catch (error) {
    console.log(error);
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
} finally {
    // Код, который выполнится в любом случае
}

console.log('Still normal');