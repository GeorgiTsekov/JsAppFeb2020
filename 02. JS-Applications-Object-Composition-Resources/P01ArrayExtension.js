(() => {
    Array.prototype.last = function () {

        return this[this.length - 1];
    };

    Array.prototype.skip = function (n) {

        return this.slice(n);
    };

    Array.prototype.take = function (n) {

        return this.slice(0, n);
    };

    Array.prototype.sum = function () {

        return this.reduce((a, b) => a + b);
    };

    Array.prototype.average = function () {

        return this.sum() / this.length;
    };

    let myArr = [1, 2, 3];
    let users = [{
        name: 'George',
        age: 23
    }, {
        name: 'Peter',
        age: 33
    }, {
        name: 'John',
        age: 43
    }];

    console.log(myArr.last());
    console.log(users.last())

    console.log(myArr.skip(1));
    console.log(users.skip(2));

    console.log(myArr.take(2));
    console.log(users.take(1));

    console.log(myArr.sum());

    console.log(myArr.average());
})();


