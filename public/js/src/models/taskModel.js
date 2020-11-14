import {Task, TASK_STATUS, URGENCY} from "./entities/task.js";

//Класс операций над задачами
class TaskModel {
    constructor() {
        this.data = new Map();
    }
	
	// поолучение всех тасков
    getTasks() {
        return new Promise((resolve, reject) => {
            let tasks = [];
            for (let entry of this.data.values()) {
                tasks.push(entry);
            }

            resolve(tasks);
        })
    }

    // поолучение таска по его ID
    getTaskByID(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(id));
        })
    }

    //Функция обновляет сотрудника в задачах после изменения сотрудника.
    updateTasksEmployee(employee) {
        return new Promise((resolve, reject) => {

            let tasks = this.getEmployeeTasksById(employee.id);

            for (let entry of tasks) {
                entry.employee = employee;
                this.data.set(entry.id, entry);
            }

            resolve(employee);
        })
    }

    //Получение таск сотрудника по id
    getEmployeeTasksById(employeeId) {
        let tasks = [];
        for (let entry of this.data.values()) {
            if (entry.employee.id == employeeId) {
                tasks.push(entry);
            }
        }

        return tasks;
    }

    //получение всех таск сотрудника по сотруднику
    getEmployeeTasks(employee) {
        return new Promise((resolve, reject) => {
            let tasks = [];
            for (let entry of this.data.values()) {
                if (entry.employee == employee) {
                    tasks.push(entry);
                }
            }
            resolve(tasks);
        })
    }

    //Получение тасок по id проекта
    getTaskByProjectId(projectId) {
        return new Promise((resolve, reject) => {
            let tasks = [];

            for (let entry of this.data.values()) {
                if (entry.projectId == projectId) {
                    tasks.push(entry);
                }
            }

            resolve(tasks);
        })
    }

    //Получение тасок по имени проекта
    getTaskByProjectName(projectName) {
        return new Promise((resolve, reject) => {
            let tasks = [];

            for (let entry of this.data.values()) {
                if (entry.projectName == projectName) {
                    tasks.push(entry);
                }
            }

            resolve(tasks);
        })
    }
	
	// создание таска
    createTask(task) {
        return new Promise((resolve, reject) => {
            let id = Math.random()*1000000;
            id = id - (id % 1);
    
            while (this.data.get(id) != null) {
                let id = Math.random()*1000000;
                id = id - (id % 1);
            }
    
            task.id = id;
            this.data.set(id, task);
            resolve(this.data.get(task.id));
        })
    }
	
	// изменение таска
    updateTask(task) {
        return new Promise((resolve, reject) => {

            let old = this.data.get(task.id);
            if (task.status == TASK_STATUS.reconciliation) {
                this.data.set(task.id, task);
                resolve(this.data.get(task.id));
            } else if (old.status == TASK_STATUS.reconciliation) {
                task.status = TASK_STATUS.haveEmployee;
                task.end = '';
                task.estimated = '';
                this.data.set(task.id, task);
                resolve(this.data.get(task.id));
            } else if(old.status == TASK_STATUS.fresh) {
                task.status = TASK_STATUS.haveEmployee;
                task.end = '';
                task.estimated = '';
                this.data.set(task.id, task);
                resolve(this.data.get(task.id));
            } else if (old.status == TASK_STATUS.haveEmployee) {
                if (task.status == old.status) {
                    task.status = TASK_STATUS.inProgress;
                    task.end = '';
                } else {
                    task.status = TASK_STATUS.reconciliation;
                }
            } else if (old.status == TASK_STATUS.inProgress) {
                if (task.status == old.status) {
                    task.status = TASK_STATUS.done;
                } else {
                    task.status = TASK_STATUS.reconciliation;
                }
            } else {
                task.end = '';
                task.estimated = '';
                task.status = TASK_STATUS.haveEmployee;
                this.data.set(task.id, task);
                resolve(this.data.get(task.id));
            }
            
            this.data.set(task.id, task);
            resolve(this.data.get(task.id));
        })
    }
	
	// удаление Таска
    deleteTask(taskId) {
        return new Promise((resolve, reject) => {
            this.data.delete(taskId);
            resolve(taskId);
        });
    }

    //Получение массива статусов
    getTaskStatuses() {
        return new Promise((resolve, reject) => {
            let statuses = [];

            for (let entry in TASK_STATUS) {
                statuses.push(TASK_STATUS[entry]);
            }
    
            resolve(statuses);
        })
    }

    //Получение массива срочностей
    getTaskUrgencies() {
        return new Promise((resolve, reject) => {
            let urgencies = [];

            for (let entry in URGENCY) {
                urgencies.push(URGENCY[entry]);
            }
    
            resolve(urgencies);
        })
    }
}

const taskModel  = new TaskModel();
export default taskModel;