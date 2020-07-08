
function personAndTeacher() {
    class Person {
        name;
        email;
        constructor(n, e) {
            this.name = n;
            this.email = e;
        }

        get species() {
            return 'classToExtend';
        }

        toSpeciesString() {
            return `I am a ${this.species}. ${this.toString()}`
        }

        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
        }
    }
    
    class Teacher extends Person {
        subject;
        constructor(n, e, s) {
            super(n, e);
            this.subject = s;
        }

        get species() {
            return super.species
        }

        toSpeciesString() {
            return super.toSpeciesString();
        }

        toString() {
            let baseStr = super.toString().slice(0, -1)
            return baseStr + `, subject: ${this.subject})`
        }
    }

    class Student extends Person {
        course;
        constructor(n, e, c) {
            super(n, e);
            this.course = c;
        }

        get species() {
            return super.species
        }

        toSpeciesString() {
            return super.toSpeciesString();
        }

        toString() {
            let baseStr = super.toString().slice(0, -1)
            return baseStr + `, course: ${this.course})`
        }
    }

    return {
        Person,
        Teacher,
        Student
    }
}

let classes = personAndTeacher();
let Teacher = classes.Teacher;
let Person = classes.Person;
let Student = classes.Student;

let p = new Person('mesho','mesho@pesho.com');
console.log(p.toString())
let t = new Teacher('Gosho','gosho@pesho.com','Meshematika');
console.log(t.toString())
let s = new Student('Tosho','tosho@pesho.com', 3);
console.log(s.toString())
console.log(p.species)
console.log(p.toSpeciesString())
console.log(s.species)
console.log(s.toSpeciesString())
console.log(t.species)
console.log(t.toSpeciesString())

