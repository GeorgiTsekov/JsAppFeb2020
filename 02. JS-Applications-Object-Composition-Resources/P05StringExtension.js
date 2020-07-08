(() => {
    String.prototype.ensureStart = function (subStr) {
        let result = '' + this;

        if (!this.startsWith(subStr)) {
            result = subStr.concat(this);
        }

        return result;
    }

    String.prototype.ensureEnd = function (subStr) {
        let result = '' + this;

        if (!this.endsWith(subStr)) {
            result = this.concat(subStr);
        }

        return result;
    }

    String.prototype.isEmpty = function () {
        return this.length === 0
    }

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }

        if (this.length <= n) {
            return this.toString();
        } else {
            let indexOf = this.substr(0, n - 2).lastIndexOf(' ');

            if (indexOf !== - 1) {
                return this.substr(0, indexOf).toString() + '...';
            } else {
                return this.substr(0, n - 3) + '...';
            }
        }
    }

    String.format = function (str, ...params) {
        // let result = params.reduce((acc, curr, i) => {
        //     acc = acc.replace(`{${i}}`, curr)

        //     return acc;
        // }, str);

        // return result;

        params
        .forEach((el, i) => {
            str = str.replace(`{${i}}`, el)
        });

        return str;
    }

    // let str = 'my string';
    // str = str.ensureStart('my');
    // str = str.ensureStart('hello ');
    // console.log(str = str.truncate(16));
    // console.log(str = str.truncate(14));
    // console.log(str = str.truncate(8));
    // console.log(str = str.truncate(4));
    // console.log(str = str.truncate(2));


    // str = String.format('The {0} {1} fox',
    //     'quick', 'brown');
    // console.log(str)
    // str = String.format('jumps {0} {1}',
    //     'dog');
    // console.log(str)

})()


