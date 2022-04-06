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
export default slider;