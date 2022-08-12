// Инкапсуляция
// Один из принципов ООП, в котором некоторые элементы скрываются от пользователя. Отделение и сокрытие переменных,
// функций, методов и свойств. Объект хранит свое состояние в приватном порядке. И только методы объекта имеют
// доступ для его изменения.

'use strict'

// class User {
//     constructor(name, age) {
//         this.name = name;
//         this._age = age;
//         // this.age = age;
//     }
//     #surname = 'Metlitski';
//
//     say() {
//         console.log(`User name ${this.name}, User surname ${this.#surname}, user age ${this._age}`);
//     }
//     get surname () {
//         return this.#surname;
//     }
//     set surname(surname) {
//         return this.#surname = surname;
//     }
//
// }
// const ivan = new User('Ivan', 30);
// console.log(ivan.surname);
//
// ivan.say();

// Module
const number = 1;

(function (){
    let number = 2;
    console.log(number);
    console.log(number + 3);
}())

console.log(number);

const user = (function(){
    const privat = function() {
        console.log('Im private!');
    };
    return {
        sayHello: privat
    };
}())
user.sayHello();