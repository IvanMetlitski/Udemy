'use strict';

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    calcArea() {
        return this.height*this.width
    }
}

class RectangleWithText extends Rectangle {
    constructor(height, width, text, bgColor) {
        super(height, width);
        this.text = text;
        this.bgColor = bgColor;
    }
    showText() {
        console.log(`Text: ${this.text} color: ${this.bgColor}`)
    }
}

const div = new RectangleWithText(10, 20, 'Hello World', 'red');

div.showText();
console.log(div.calcArea());


// const squad =new Rectangle(10,10);
//
// console.log(squad.calcArea())




