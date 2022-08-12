'use strict'

// console.log('Loading...');
//
// const req = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('Preparing for data...')
//
//         const product = {
//             name: 'TV',
//             price: 2000
//         }
//
//         resolve(product);
//
//     }, 2000);
// });
//
// req.then((product) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';
//             resolve(product);
//
//         }, 2000);
//     });
// }).then(product => {
//     product.modify = true;
//     return product;
//
// }).then((product)=> {
//     console.log(product);
// }).finally(()=> {
//     console.log('Its a final countdown');
// });

// const test = time => {
//     return new Promise(resolve => {
//         setTimeout(()=>resolve (), time);
//     })
// }
// test(1000).then(()=>console.log('1000 ms'));
// test(2000).then(()=>console.log('2000 ms'));

// Promise.all([test(1000)],[test(2000)]).then(()=>{
//     console.log('All')
// })
// Promise.race([test(1000)],[test(2000)]).then(()=>{
//     console.log('All')
// })

//Fetch API

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({name: 'Alex'}),
    headers: {
        'Content-type': 'application/json'
    }
})
    .then(response => response.json())
    .then(json => console.log(json))





