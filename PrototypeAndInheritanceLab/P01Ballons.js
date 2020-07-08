function solve() {

    class Balloon {
        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight = gasWeight;
        }
    }

    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);

            this.ribbonColor = ribbonColor;
            this.ribbonLength = ribbonLength;
        }

        get ribbon() {
            return {
                color: this.ribbonColor,
                length: this.ribbonLength
            }
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength);

            this._text = text;
        }

        get text() {
            return this._text;
        }
    }

    return {
        Balloon,
        PartyBalloon,
        BirthdayBalloon
    }
}

let classes = solve();
let Balloon = classes.Balloon;
let PartyBallon = classes.PartyBalloon;
let BirthdayBalloon = classes.BirthdayBalloon;

let c = new Balloon('Red', 12);
console.log(c.color)
console.log(c.gasWeight); // 78.53981633974483

let r = new PartyBallon('Yellow', 4, 'black', 13);
console.log(r.ribbon); // 1200 
console.log(r.color); //Figures units: mm Area: 1200 - width: 30, height: 40

let b = new BirthdayBalloon('Yellow', 4, 'silver', 22, 'test')
console.log(b.text); // 12
console.log(b.ribbon); // Figures units: cm Area: 12 - width: 3, height: 4

console.log(r.ribbon.color); // 7853.981633974483
console.log(r.ribbon.length) // Figures units: mm Area: 7853.981633974483 - radius: 50