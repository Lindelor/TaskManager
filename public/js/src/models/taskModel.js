import {Task, TASK_STATUS, URGENCY} from "./entities/task.js"

//Класс операций над задачами
class TaskModel {
    constructor() {
        this.data = new Map();
        this.data.set(1, new Task(1, "TaskA", "Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1", "ProjectA", 0, 2, '', TASK_STATUS.haveEmployee, '11' + ' Ivanov Ivan Ivanovich', URGENCY.ASAP));
        this.data.set(2, new Task(2, "TaskB", "Bla-bla-bla2", "ProjectA", 0, 5, '', TASK_STATUS.haveEmployee, '11' + ' Ivanov Ivan Ivanovich', URGENCY.Low));
        this.data.set(3, new Task(3, "TaskC", "Bla-bla-bla3", "ProjectB", 1, 8, '', TASK_STATUS.inProgress, '11' + ' Ivanov Ivan Ivanovich', URGENCY.Low));
        this.data.set(4, new Task(4, "TaskD", "Bla-bla-bla4", "ProjectB", 1, 2, 3, TASK_STATUS.done, '12' + ' Petrov Sergey Sergeevich', URGENCY.NVM));
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

    //получение всех таск сотрудника
    getEmployeeTasks(employeeIdFIO) {
        return new Promise((resolve, reject) => {
            let tasks = [];

            for (let entry of this.data.values()) {
                if (entry.employee == employeeIdFIO) {
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
            this.data.set(task.id, task)
            resolve(this.data.get(task.id))
        })
    }
	
	// удаление Таска
    deleteTask(task) {
        this.data.delete(employeeId);
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