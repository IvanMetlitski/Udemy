/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator () {
    // Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    };

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'
            return;
        } if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', event.target.getAttribute('data-ratio'))
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'))
                }
                console.log(ratio, sex);

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);

                calcTotal();
            })
        });
    };

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', ()=> {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        })
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
};
module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    //Classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className))
            element.innerHTML = `
                    <div class="menu__item">
            
                
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    
                </div>`;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })

};
module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    //Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'fail'
    }
    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type':
                    'application/json'
            },
            body: data
        });
        return await result.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // request.send(json);

            postData('http://localhost:3000/requests\n', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openBlock();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeBlock();
        }, 4000);
    }

    fetch(' http://localhost:3000/menu\n')
        .then(data => data.json())
    // .then(item=> console.log(item))
};
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    // modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openBlock)
    })

    function openBlock() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(openBlock)
    }

    function closeBlock() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeBlock()
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeBlock()
        }
    })

    // const timerModalId = setTimeout(openBlock, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openBlock()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
};
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    // Slider

    const sliderImg = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        sliderPrev = document.querySelector('.offer__slider-prev'),
        sliderNext = document.querySelector('.offer__slider-next'),
        sliderCurrent = document.querySelector('#current'),
        sliderTotal = document.querySelector('#total'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(sliderWrapper).width;

    function deleteDigits(string) {
        return +string.replace(/\D/g, '');
    }

    let sliderIndex = 1;
    let offset = 0;

    if (sliderImg.length < 10) {
        sliderTotal.textContent = `0${sliderImg.length}`;
        sliderCurrent.textContent = `0${sliderIndex}`
    } else {
        sliderTotal.textContent = 'sliderImg.length';
        sliderCurrent.textContent = sliderIndex;
    }

    sliderField.style.width = 100 * sliderImg.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden';

    sliderImg.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    let dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);


    for (let i = 0; i < sliderImg.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    };

    sliderNext.addEventListener('click', () => {
        if (offset == deleteDigits(width) * (sliderImg.length - 1)) {
            offset = 0;
        } else {
            offset += deleteDigits(width);
        }
        sliderField.style.transform = `translateX(-${offset}px`;

        if (sliderIndex == sliderImg.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        if (sliderImg.length < 10) {
            sliderCurrent.textContent = `0${sliderIndex}`;
        } else {
            sliderCurrent.textContent = sliderIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex - 1].style.opacity = '1';

    })

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteDigits(width) * (sliderImg.length - 1);
        } else {
            offset -= deleteDigits(width);
        }
        sliderField.style.transform = `translateX(-${offset}px`;

        if (sliderIndex == 1) {
            sliderIndex = sliderImg.length;
        } else {
            sliderIndex--;
        }
        if (sliderImg.length < 10) {
            sliderCurrent.textContent = `0${sliderIndex}`;
        } else {
            sliderCurrent.textContent = sliderIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sliderIndex - 1].style.opacity = '1';

    })
    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            offset =deleteDigits(width) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px`;

            if (sliderImg.length < 10) {
                sliderTotal.textContent = `0${sliderImg.length}`;
                sliderCurrent.textContent = `0${sliderIndex}`
            };
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[sliderIndex - 1].style.opacity = '1';
        })
    })

    // showSlides(sliderIndex);
    //
    // if (sliderImg.length < 10) {
    //     sliderTotal.textContent = `0${sliderImg.length}`;
    // } else {
    //     sliderTotal.textContent = 'sliderImg.length';
    // }
    //
    // function showSlides (n) {
    //     if (n > sliderImg.length) {
    //         sliderIndex = 1;
    //     }
    //     if (n < 1) {
    //         sliderIndex = sliderImg.length
    //     }
    //     sliderImg.forEach((slide) => {
    //         slide.style.display = 'none';
    //     })
    //     sliderImg[sliderIndex - 1].style.display = 'block';
    //
    //     if (sliderImg.length < 10) {
    //         sliderCurrent.textContent = `0${sliderIndex}`;
    //     } else {
    //         sliderCurrent.textContent = sliderIndex;
    //     }
    //
    // }
    // function plusSlide (n) {
    //     showSlides(sliderIndex += n)
    // }
    //
    // sliderPrev.addEventListener('click', () => {
    //    plusSlide(-1)
    // });
    // sliderNext.addEventListener('click', () => {
    //     plusSlide(+1)
    // })
};
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    // Tabs

    const tab = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
            item.classList.remove('fade')
        })
        tab.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tab[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tab.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    // Timer

    const deadline = '2022-03-28';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds,
        }

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'), minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'), timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

};
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    modal();
    timer();
    cards();
    calculator();
    forms();
    slider();

});






})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map