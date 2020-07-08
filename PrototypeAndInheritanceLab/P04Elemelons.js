function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }

            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            return `Element: ${this.constructor.name.split('melon')[0]}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Watermelon {
        name = 'Watermelon';
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }

        morph() {
            let melons = ['Watermelon', 'Firemelon', 'Earthmelon', 'Airmelon'];
            let index = melons.findIndex(x => x === this.name)
            if (index !== - 1) {
                if (melons.length > index + 1) {
                    this.name = melons[index + 1];
                } else {
                    this.name = melons[0];
                }
            }

            return this.name
        }

        toString() {
            return `Element: ${this.name.split('melon')[0]}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }

    return {
        Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon
    }
}
let classes = solve();
let Melon = classes.Melon;
let Watermelon = classes.Watermelon;
let Firemelon = classes.Firemelon;
let Earthmelon = classes.Earthmelon;
let Airmelon = classes.Airmelon;
let Melolemonmelon = classes.Melolemonmelon;
let test = new Melolemonmelon(150, "Melo");
console.log(test.morph())
console.log(test.morph())
console.log(test.morph())
console.log(test.morph())
console.log(test.morph())
// let test = new Melon(100, "Test");
//Throws error

let watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());

// Element: Water
// Sort: Kingsize
// Element Index: 100
