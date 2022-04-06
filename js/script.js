import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal, {openBlock} from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';


window.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(()=> openBlock('.modal', modalTimerID), 50000);

    tabs(".tabheader__item",".tabcontent", '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerID);
    timer('.timer', '2022-06-11');
    cards();
    calculator();
    forms('form', modalTimerID);
    slider({
        container:'.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });

});





