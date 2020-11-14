import CMainTab from './src/components/CMainTab.js';
import employeeModel from './src/models/employeeModel.js';
import authModel from './src/models/authModel.js';
import {Task, TASK_STATUS, URGENCY} from "./src/models/entities/task.js";
import taskModel from './src/models/taskModel.js';
import projectModel from './src/models/projectModel.js';

//инициализация базовых пользователей
let firstUserPromise = authModel.getUserById(12);
let firstEmployeePromise = employeeModel.getEmployeeById(12);
let secondUserPromise = authModel.getUserById(11);
let secondEmployeePromise = employeeModel.getEmployeeById(11);



//Инициализация приложения и базовых задач с проектами.
firstEmployeePromise.then((firstEmployee) => {
	firstUserPromise.then((firstUser) => {
		secondUserPromise.then((secondUser) => {
			secondEmployeePromise.then((secondEmployee) => {
				let TaskA = new Task(1, "TaskA", "Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1 Bla-bla-bla1", "ProjectA", 4, 2, '', TASK_STATUS.haveEmployee, secondEmployee, URGENCY.ASAP);
				let TaskB = new Task(2, "TaskB", "Bla-bla-bla2", "ProjectA", 4, 5, '', TASK_STATUS.haveEmployee, secondEmployee, URGENCY.Low);
				let TaskC = new Task(3, "TaskC", "Bla-bla-bla3", "ProjectB", 1, 8, '', TASK_STATUS.inProgress, secondEmployee, URGENCY.Low);
				let TaskD = new Task(4, "TaskD", "Bla-bla-bla4", "ProjectB", 1, 2, 3, TASK_STATUS.done, firstEmployee, URGENCY.NVM);
				taskModel.createTask(TaskA).then((res) => {
					taskModel.createTask(TaskB).then((res1) => {
						taskModel.createTask(TaskC).then((res2) => {
							taskModel.createTask(TaskD).then((res3) => {
								projectModel.getProjectById(1).then((p1) => {
									projectModel.getProjectById(2).then((p2) => {
										projectModel.getProjectById(3).then((p3) => {
											projectModel.getProjectById(4).then((p4) => {
												p1.teamLead = firstEmployee;
												p2.teamLead = firstEmployee;
												p3.teamLead = firstEmployee;
												p4.teamLead = firstEmployee;
												p1.employees.push(secondEmployee);
												p1.employees.push(firstEmployee);
												p4.employees.push(secondEmployee);
												projectModel.updateProject(p1).then((rp1) => {
													projectModel.updateProject(p2).then((rp2) => {
														projectModel.updateProject(p3).then((rp3) => {
															projectModel.updateProject(p4).then((rp4) => {
																let mainTab = new CMainTab(firstEmployee, firstUser);
																mainTab.init();
																webix.ui(mainTab.config());
																mainTab.attachEvents();
															})
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				})

			})
		})
	})
})


