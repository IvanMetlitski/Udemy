'use strict'

//Filter

// const arr = ['Ivan', 'Anna', 'Alina', 'Lev', 'Vyacheslav'];
//
// // const shortArr =arr.filter(function (name) {
// //     return name.length < 5
// //     }
// // )
// // console.log(shortArr);
//
// const lowerNames = arr.map(function (name) {
//     return name.toLowerCase()
// })
//
// console.log(lowerNames)
// console.log(arr)

//Every/Some

// const others = [4, '2312', 'qwwert'];
//
// console.log(others.some(item=> typeof(item) === "number"));
//
// console.log(others.every(item=> typeof(item) === "number"))

//Reduce

// const arr = [1, 3, 5, 2, 4, 6];
// // let sum = 0;
// //
// // for (let i = 0; i < arr.length; i++) {
// //     sum+=arr[i];
// // }
// // console.log(sum)
//
// const red = arr.reduce((sum, current)=> sum + current)
// console.log(red)

// const arr = ['apple', 'pineapple', 'plum'];
//
// const red = arr.reduce((sum, current)=> `${sum}, ${current}`)
// console.log(red)

const obj = {
    ivan: 'person',
    ann: 'person',
    dog: 'animal',
    cat: 'animal'
}
const newArr = Object.entries(obj)
    .filter(item=> item[1] === 'person')
    .map(item=> item[0]);

console.log(newArr);



