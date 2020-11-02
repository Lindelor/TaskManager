import {POSITION} from '../models/entities/employee.js';
import getRegisterForm from './forms/registerForm.js';
import getTaskForm from './forms/addTaskForm.js';
import getProjectForm from './forms/addProjectForm.js';
import getRemoveProjectForm from './forms/removeProjectForm.js';
import CTaskCreateWindow from './Tasks/CTaskCreateWindow.js';

//Возвращает конфигурацию основного окна, требует пользователя и ячейки для мультивью
export function getMainTab(employee, user, cells) {
	if (employee.position == POSITION.teamLead) {
		return getFullTab(user, cells);
	} else {
		return getLimitedTab(user, cells);
	}
}

function getFullTab(user, cells) {

	return {
		rows: [

			{
				cols: [
					{view: 'button', id: 'addTask', value:"Создать задачу", width:200, click:taskCreate},
					{view: 'button', id: 'addProject', value:"Создать проект", width:200, click:function(){getProjectForm()}},
					{view: 'button', id: 'removeProject', value:"Удалить проект", width:200, click:function(){getRemoveProjectForm()}},
					{view: 'button', id: 'registerUser', value:"Зарегистрировать", width:200, click:function(){getRegisterForm()}},
					{id: 'spaceFiller', fillspace:true},
					{view: 'button', id: 'userButton', value:user.email, width:150 },
					{view: 'button', id: 'logoutButton', value:'Выйти', width:150, click:function(){alert("Вышел")} },
				],
			},
			{view:"tabview", multiview:true, cells: cells}
		],
	}
}

function taskCreate() {
	let taskCreateWindow = new CTaskCreateWindow();
	taskCreateWindow.init();
	taskCreateWindow.config().show();
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