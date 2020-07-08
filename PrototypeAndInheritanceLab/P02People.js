function solve() {
    class Employee {

        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error('Canot instantiate directly!')
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }

        getSalary() {
            return this.salary;
        }

        work() {
            let currentTask = this.tasks.shift();
            console.log(this.name + currentTask);
            this.tasks.push(currentTask);
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee {

        constructor(name, age) {
            super(name, age);
            this.tasks.push(` is working on a simple task.`);
        }
    }

    class Senior extends Employee {

        constructor(name, age) {
            super(name, age);
            this.tasks.push(` is working on a complicated task.`);
            this.tasks.push(` is taking time off work.`);
            this.tasks.push(` is supervising junior workers.`);
        }
    }

    class Manager extends Employee {

        constructor(name, age) {
            super(name, age);
            this.tasks.push(` scheduled a meeting.`);
            this.tasks.push(` is preparing a quarterly report.`);
            this.dividend = 0;
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }


    return {
        Employee,
        Junior,
        Senior,
        Manager
    }
}

// let classes = solve();
// let Balloon = classes.Balloon;
// let PartyBallon = classes.PartyBalloon;
// let BirthdayBalloon = classes.BirthdayBalloon;

// let c = new Balloon('Red', 12);
// console.log(c.color)
// console.log(c.gasWeight); // 78.53981633974483

// let r = new PartyBallon('Yellow', 4, 'black', 13);
// console.log(r.ribbon); // 1200 
// console.log(r.color); //Figures units: mm Area: 1200 - width: 30, height: 40

// let b = new BirthdayBalloon('Yellow', 4, 'silver', 22, 'test')
// console.log(b.text); // 12
// console.log(b.ribbon); // Figures units: cm Area: 12 - width: 3, height: 4

// console.log(r.ribbon.color); // 7853.981633974483
// console.log(r.ribbon.length) // Figures units: mm Area: 7853.981633974483 - radius: 50