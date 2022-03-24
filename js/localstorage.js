'use strict'

// LocalStorage находится в браузере и служит для хранения данных. Имеет вид объекта.
// Значения сохраняет в виде ключ - значение


// Команда для установки значения
localStorage.setItem('number', 5);

// Команда для получения значения
localStorage.getItem('number');
console.log(localStorage.getItem('number'));

// Удаление ключа
localStorage.removeItem('number');

// Очистка всего хранилища
localStorage.clear();

const person = {
    name: 'Alex',
    age: 35
};

const searilizedPerson = JSON.stringify(person);
localStorage.setItem('Alex', searilizedPerson);
console.log(JSON.parse(localStorage.getItem('Alex')));
