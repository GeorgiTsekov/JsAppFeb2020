function result() {
    class Figure {
        units = {
            m: 0.01,
            cm: 1,
            mm: 10
        }
    
        defauthUnit;
    
        constructor(unit = 'cm') {
            this.defauthUnit = unit;
        }
    
        get area() { return NaN; }
    
        changeUnits(x) { return this.defauthUnit = x; }
    
        unitNumberByName(x) { return x * this.units[this.defauthUnit]; }
    
        toString() { return `Figures units: ${this.defauthUnit} Area: ${this.area} - ` }
    }
    
    class Circle extends Figure {
        radius = 0;
    
        constructor(r, ...rest) {
            super(...rest);
            this.radius = r;
        }
    
        get r() {
            return this.unitNumberByName(this.radius);
        }

        get area() {
            return Math.PI * this.r * this.r;
        }
    
        toString() {
            return super.toString() + `radius: ${this.r}`
        }
    }
    
    class Rectangle extends Figure {
        width = 0;
        height = 0;
        constructor( w, h, ...rest) {
            super(...rest);
            this.width = w;
            this.height = h;
        }
        
        get w() {
            return this.unitNumberByName(this.width);
        }

        get h() {
            return this.unitNumberByName(this.height);
        }


        get area() {
            return this.w * this.h;
        }
    
        toString() {
            return super.toString() + `width: ${this.w}, height: ${this.h}`
        }
    }

    return {
        Figure,
        Rectangle,
        Circle
    }
}

let classes = result();
let Figure = classes.Figure;
let Rectangle = classes.Rectangle;
let Circle = classes.Circle;

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50
