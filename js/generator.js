'use strict'

// function* generator() {
//     yield 'S';
//     yield 'c';
//     yield 'r';
//     yield 'i';
//     yield 'p';
//     yield 't';
// };
//
// const one = generator();
//
// console.log(one.next());
// console.log(one.next());
// console.log(one.next());
// console.log(one.next());
// console.log(one.next());
// console.log(one.next());
// console.log(one.next());

function* count(n) {
    for (let i =0; i < n; i++) {
        yield i;
    }
};

for (let i of count(7)) {
    console.log(i);
}


// const counter = count(5);
//
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
