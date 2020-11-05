import {POSITION} from '../models/entities/employee.js';
import getRegisterForm from './forms/registerForm.js';
import CTaskCreateWindow from './Tasks/CTaskCreateWindow.js';
import projectModel from '../models/projectModel.js';
import taskModel from '../models/taskModel.js';
import CProjectCreateWindow from './Projects/CProjectCreateWindow.js';

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
					{view: 'button', id: 'registerUser', value:"Зарегистрировать", hidden:true, width:200, click:function(){getRegisterForm()}},
					{id: 'spaceFiller', fillspace:true},
					{view: 'button', id: 'userButton', value:user.email, width:150 },
					{view: 'button', id: 'logoutButton', value:'Выйти', width:150, click:function(){alert("Вышел")} },
				],
			},
			{view:"tabview", id:"mainView", multiview:true, cells: cells}
		],
	}
}

function taskCreate() {
	projectModel.getProjectsNames().then((projectsNames) => {
		taskModel.getTaskUrgencies().then((urgencies) => {
			let taskCreateWindow = new CTaskCreateWindow();
			taskCreateWindow.init();
			taskCreateWindow.config(projectsNames, urgencies);
			taskCreateWindow.attachEvents();
		})
	})
}

function projectCreate() {
	projectModel.getAllTeamLeadsIdFIO().then((result) => {
		let projectCreateWindow = new CProjectCreateWindow();
		projectCreateWindow.init();
		projectCreateWindow.config(result);
		projectCreateWindow.attachEvents();
	})
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