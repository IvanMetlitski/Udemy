/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //     })

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerID) {

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'fail'
    }
    forms.forEach(item => {
        bindPostData(item);
    })



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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests\n', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openBlock)('.modal', modalTimerID);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeBlock)('.modal');
        }, 4000);
    }

    fetch(' http://localhost:3000/menu\n')
        .then(data => data.json())
    // .then(item=> console.log(item))
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeBlock": () => (/* binding */ closeBlock),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openBlock": () => (/* binding */ openBlock)
/* harmony export */ });
function openBlock(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerID)
    if (modalTimerID) {
    clearInterval(modalTimerID)
    }
}

function closeBlock(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    // modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click',()=> openBlock(modalSelector, modalTimerId))
    })

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeBlock((modalSelector))
        }
    })
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeBlock((modalSelector))
        }
    })

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openBlock(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const sliderImg = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        sliderPrev = document.querySelector(prevArrow),
        sliderNext = document.querySelector(nextArrow),
        sliderCurrent = document.querySelector(currentCounter),
        sliderTotal = document.querySelector(totalCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tab = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
            item.classList.remove('fade')
        })
        tab.forEach(item => {
            item.classList.remove(activeClass)
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

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tab.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

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

    setClock(id, deadline);

};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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

const getResource = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
}




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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openBlock)('.modal', modalTimerID), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item",".tabcontent", '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerID);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerID);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
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






})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map