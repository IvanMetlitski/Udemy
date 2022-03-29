// Инкапсуляция
// Один из принципов ООП, в котором некоторые элементы скрываются от пользователя. Отделение и сокрытие переменных,
// функций, методов и свойств. Объект хранит свое состояние в приватном порядке. И только методы объекта имеют
// доступ для его изменения.

'use strict'

class User {
    constructor(name, age) {
        this.name = name;
        this._age = age;
        // this.age = age;
    }
    #surname = 'Metlitski';

    say() {
        console.log(`User name ${this.name}, user age ${this._age}`);
    }
    get surname () {
        return this.#surname;
    }
    set surname(surname) {
        return this.#surname = surname;
    }

}
const ivan = new User('Ivan', 30);
console.log(ivan.surname);

ivan.say();