import {Task, TASK_STATUS, URGENCY} from '../models/entities/task.js';
import {Employee, POSITION} from '../models/entities/employee.js';
import {Project} from '../models/entities/project.js';
import {taskModel} from '../models/taskModel.js';

//Возвращает таски, позже будет подключено к базе.
export function getTaskData() {
	return[
	task1,
	task2,
	task3,
	task4,
];
}

let employee1 = new Employee(11, "Ivan", "Ivanov", "Ivanovich", POSITION.manager, "834964843543", 11);
let employee2 = new Employee(12, "Iv", "Iva", "Ivanovi", POSITION.teamLead, "74386789347", 12);
let project1 = new Project(101, "ProjectA", "ProjectA bla-bla-bla");
let project2 = new Project(102, "ProjectB", "ProjectB bla-bla-bla");
let task1 = new Task(1, "TaskA", "Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1", project1.id, 2, '', TASK_STATUS.haveEmployee, employee1.id, URGENCY.ASAP);
let task2 = new Task(2, "TaskB", "Bla-bla-bla2", project1.id, 5, '', TASK_STATUS.haveEmployee, employee1.id, URGENCY.Low);
let task3 = new Task(3, "TaskC", "Bla-bla-bla3", project2.id, 8, '', TASK_STATUS.inProgress, employee1.id, URGENCY.Low);
let task4 = new Task(4, "TaskD", "Bla-bla-bla4", project2.id, 2, 3, TASK_STATUS.done, employee2.id, URGENCY.NVM);