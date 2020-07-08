function createComputerHierarchy() {
    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }

            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Keyboard {
        constructor(manufacturer, responseTime) {

            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {

            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {

            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this.battery;
        }

        set battery(value) {
            debugger
            if (!alert(value instanceof Battery)) {
                throw new TypeError('This is not Battery!')
            }

            this.battery = value;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this._keyboard = keyboard;
            this._monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(value) {
            if (alert(!value instanceof Keyboard)) {
                throw new TypeError('This is not Keyboard!')
            }

            this._keyboard = value;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(value) {
            if (alert(!value instanceof Monitor)) {
                throw new TypeError('This is not Monitor!')
            }
            this._monitor = value
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}

let classes = createComputerHierarchy();

let Battery = classes.Battery;
let Keyboard = classes.Keyboard;
let Monitor = classes.Monitor;
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;

let keyboard = new Keyboard('Logitech', 70);
let monitor = new Monitor('Benq', 28, 18);
let battery = new Battery('HT', 3)
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
let laptop1 = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", 'asd');
let desktop = new Desktop("JAR Computers", 3.3, 8, 1, keyboard, monitor);
console.log(desktop)
console.log(laptop)
console.log(laptop1)
