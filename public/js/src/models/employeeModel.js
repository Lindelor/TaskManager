import {Employee, POSITION} from "./entities/employee.js"

//Класс для операций над сотрудниками
class EmployeeModel {
    constructor() {
        this.data = new Map();
        this.data.set(11, new Employee(11, "Ivan", "Ivanov", "Ivanovich", POSITION.manager, "834964843543", 11, "ivan90@mail.ru"));
        this.data.set(12, new Employee(12, "Sergey", "Petrov", "Sergeevich", POSITION.teamLead, "74386789347", 12, "sergey90@bk.ru"));
    }

    //Получение всех сотрудников
    getEmployees() {
        return new Promise((resolve, reject) => {
            let employees = [];

            for (let employee of this.data.values()) {
                employees.push(employee);
            }

            resolve(employees);

        })
    }

    //Получение массива из id + ФИО сотрудников
    getEmployeesIdFIO() {
        return new Promise((resolve, reject) => {
            let employees = [];

            for (let employee of this.data.values()) {
                let patronymic;
                if (employee.patronymic == null || employee.patronymic == '') {
                    patronymic = '';
                } else {
                    patronymic = employee.patronymic;
                }
                employees.push(employee.id + ' ' + employee.lastName  + ' ' + employee.firstName + ' ' + patronymic);
            }

            resolve(employees);

        })
    }

    //получения ID+FIO всех тимлидов
    getTeamLeadsIdFIO(){
        return new Promise((resolve, reject) => {
            let employees = [];

            for (let employee of this.data.values()) {
                if (employee.position == POSITION.teamLead) {
                    let patronymic;
                    if (employee.patronymic == null || employee.patronymic == '') {
                        patronymic = '';
                    } else {
                        patronymic = employee.patronymic;
                    }
                    employees.push(employee.id + ' ' + employee.lastName  + ' ' + employee.firstName + ' ' + patronymic);
                }
            }

            resolve(employees);
        })
    }

    //Получение сотрудника из ID+FIO
    getEmployeeByIdFIO(FIO) {
        let id = '';
        for (let i = 0; i < FIO.length; i++) {
          if (FIO[i] == ' ') {
            break;
          } else {
            id += FIO[i];
          }
        }
        return this.getEmployeeById(Number(id));
    }

    //Получение сотрудника по его id
    getEmployeeById(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(id));
        })
    }

    //Создание сотрудника
    createEmployee(employee) {
        return new Promise((resolve, reject) => {
            let id = Math.random()*1000000;
            id = id - (id % 1);
    
            while (this.data.get(id) != null) {
                let id = Math.random()*1000000;
                id = id - (id % 1);
            }
    
            employee.id = id;
            employee.userId = id;
            this.data.set(id, employee);
            resolve(this.data.get(employee.id));
        })
    }

    //Изменение сотрудника
    updateEmployee(employee) {
        return new Promise((resolve, reject) => {
            this.data.set(employee.id, employee)
            resolve(this.data.get(employee.id))
        })
    }

    //Удаление сотрудника
    removeEmployee(employeeId) {
        this.data.get(employeeId).isRemoved = true;
        return new Promise((resolve, reject) => {
            resolve(employeeId);
        });
    }

    //Восстановление сотрудника
    restoreEmployee(employeeId) {
        this.data.get(employeeId).isRemoved = false;
        return new Promise((resolve, reject) => {
            resolve(employeeId);
        });
    }

    //Получение должностей
    getPositions() {
        return new Promise((resolve, reject) => {
            let positions = [];

            for (let entry in POSITION) {
                positions.push(POSITION[entry]);
            }
    
            resolve(positions);
        });
    }
}

const employeeModel  = new EmployeeModel();
export default employeeModel;