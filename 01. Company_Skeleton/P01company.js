class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        if (!username || !salary || !position || !department) {
            throw new Error("Invalid input!");
        }

        if (Number(salary) < 0) {
            throw new Error(" Invalid input!");
        }

        let employee = {
            username,
            salary: Number(salary),
            position,
            department
        }

        this.departments.push(employee)

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        this.departments.sort(function (a, b) {
            return a.username.localeCompare(b.username)
        });

        this.departments.sort((a, b) => (b.salary - a.salary));

        let maxSum = 0;

        let filtredDep = this.departments.reduce((maxAcc, currDep) => {
            let newDep = currDep.department;

            let accDep = this.departments.filter(x => x.department === newDep);
            
            let sum = accDep.reduce((acc, curr) => acc + Number(curr.salary), 0);

            sum = sum / accDep.length;

            if (sum > maxSum) {
                maxSum = sum;
                maxAcc = accDep;
            }

            return maxAcc;
        }, []);

        let result = '';

        result += `Best Department is: ${filtredDep[0].department}\n`;

        result += `Average salary: ${maxSum.toFixed(2)}\n`

        for (const key in filtredDep) {
            result += `${filtredDep[key].username} ${filtredDep[key].salary} ${filtredDep[key].position}\n`
        }

        return result.trim();
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
