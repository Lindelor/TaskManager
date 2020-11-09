import {POSITION} from '../models/entities/employee.js';
import CTaskCreateWindow from './Tasks/CTaskCreateWindow.js';
import projectModel from '../models/projectModel.js';
import taskModel from '../models/taskModel.js';
import CProjectCreateWindow from './Projects/CProjectCreateWindow.js';
import CRegisterUserWindow from './Employees/CRegisterUserWindow.js'
import employeeModel from '../models/employeeModel.js';
import authModel from '../models/authModel.js';

//Возвращает конфигурацию основного окна, требует пользователя и ячейки для мультивью
export function getMainTab(employee, user, cells) {
	if (employee.position == POSITION.teamLead) {
		return getFullTab(user, cells, employee);
	} else {
		return getLimitedTab(user, cells);
	}
}

function getFullTab(user, cells) {

	return {
		rows: [

			{
				cols: [
					{view: 'button', id: 'addTask', value:"Создать задачу", width:200, click:taskCreate, hidden:true},
					{view: 'button', id: 'addProject', value:"Создать проект", width:200, hidden:true, click:projectCreate},
					{view: 'button', id: 'registerUser', value:"Зарегистрировать", hidden:true, width:200, click:registerUser},
					{id: 'spaceFiller', fillspace:true},
					{view: 'button', id: 'userButton', value:user.email, width:150 },
					{view: 'button', id: 'logoutButton', value:'Выйти', width:150, click:function(){alert("Вышел")} },
				],
			},
			{view:"tabview", id:"mainView", multiview:true, cells: cells}
		],
	}
}

function registerUser() {
	employeeModel.getPositions().then((result) => {
		let registerUserWindow = new CRegisterUserWindow();
		registerUserWindow.init();
		registerUserWindow.config(result).show();
		registerUserWindow.attachEvents();
	})
}

function taskCreate() {
	projectModel.getProjectsNames().then((projectsNames) => {
		taskModel.getTaskUrgencies().then((urgencies) => {
			let taskCreateWindow = new CTaskCreateWindow();
			taskCreateWindow.init();
			taskCreateWindow.config(projectsNames, urgencies).show();
			taskCreateWindow.attachEvents();
		})
	})
}

function projectCreate() {
	employeeModel.getTeamLeadsIdFIO().then((result) => {
		let projectCreateWindow = new CProjectCreateWindow();
		projectCreateWindow.init();
		projectCreateWindow.config(result).show();
		projectCreateWindow.attachEvents();
	});
}

function getLimitedTab(user, cells) {
	return {
		rows: [

			{
				cols: [
					{id: 'spaceFiller', fillspace:true},
					{view: 'button', id: 'userButton', value:user.email, width:150 },
					{view: 'button', id: 'logoutButton', value:'Выйти', width:150, click:function(){alert("Вышел")} },
				],
			},
			{view:"tabview", multiview:true, cells: cells}
		],
	}
}