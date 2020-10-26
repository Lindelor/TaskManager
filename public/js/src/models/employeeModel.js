import {Employee, POSITION} from "./entities/employee.js"
//Класс для операций над сотрудниками
class EmployeeModel {
    constructor() {
        this.data = new Map();
        this.data.set(11, new Employee(11, "Ivan", "Ivanov", "Ivanovich", POSITION.manager, "834964843543", 11));
        this.data.set(12, new Employee(12, "Sergey", "Petrov", "Sergeevich", POSITION.teamLead, "74386789347", 12));
    }

    getEmployees() {
        return new Promise((resolve, reject) => {
            let employees = [];

            for (let employee of this.data.values()) {
                employees.push(employee);
            }

            resolve(employees);

        })
    }

    getEmployeeById(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(id));
        })
    }

    createEmployee(employee) {
        return new Promise((resolve, reject) => {
            let id = Math.random()*1000000;
            id = id - (id % 1);
    
            while (this.data.get(id) != null) {
                let id = Math.random()*1000000;
                id = id - (id % 1);
            }
    
            employee.id = id;
            this.data.set(id, employee);
            resolve(this.data.get(employee.id));
        })
    }

    updateEmployee(employee) {
        return new Promise((resolve, reject) => {
            this.data.set(employee.id, employee)
            resolve(this.data.get(employee.id))
        })
    }

    removeEmployee(employeeId) {
        this.data.delete(employeeId);
    }

    getPositions() {
        let positions = [];

        for (let entry in POSITION) {
            positions.push(POSITION[entry]);
        }

        return positions;
    }
}

const employeeModel  = new EmployeeModel();
export default employeeModel;