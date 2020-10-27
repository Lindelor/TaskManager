import {Employee, POSITION} from '../models/entities/employee.js';
import showTask from './taskWindow.js';
import taskModel from '../models/taskModel.js';
import {currentEmployee} from '../../script.js';

//Функция обновления таблицы
export function refreshTables() {
	if (currentEmployee.position == POSITION.teamLead) {
		taskModel.getTasks().then((taskData) => {
			$$('projectsTab').clearAll();
			$$('projectsTab').parse(taskData);
		})
	} else {
		let empl;
		if (currentEmployee.patronymic == null) {
			empl = currentEmployee.id + ' ' + currentEmployee.lastName + ' ' + currentEmployee.firstName + ' ';
		} else {
			empl = currentEmployee.id + ' ' + currentEmployee.lastName + ' ' + currentEmployee.firstName + ' ' + currentEmployee.patronymic;
		}
		taskModel.getEmployeeTasks(empl).then((taskData) => {
			$$('projectsTab').clearAll();
			$$('projectsTab').parse(taskData);
		})
	}
}

// возвращает webix конфигурацию таба проектов
export function getProjectsTab(taskData, currentUser) {
	if (currentUser.position == POSITION.teamLead) {
		return fullProjectTab(taskData, currentUser);
	} else {
		let empl;
		if (currentEmployee.patronymic == null) {
			empl = currentEmployee.id + ' ' + currentEmployee.lastName + ' ' + currentEmployee.firstName + ' ';
		} else {
			empl = currentEmployee.id + ' ' + currentEmployee.lastName + ' ' + currentEmployee.firstName + ' ' + currentEmployee.patronymic;
		}
		taskData = taskModel.getEmployeeTasks(empl);
		return limitedProjectTab(taskData, currentUser);
	}

}

function fullProjectTab(taskData, currentUser) {
    return (
		{id: 'projectsTab', header: 'Задачи', view:'datatable', resizeRow:true, columns:[
		{ id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
		{ id:"name", header:["Имя", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
		{ id:"projectName", header:["Проект", {content:"selectFilter"}], css:"rank", sort:"int", width:100},
		{ id:"estimated", header:["Пред. Время", {content:"textFilter"}], editor:"text", css:"rank", sort:"int", width:170},
		{ id:"urgency", header:["Срочность", {content:"selectFilter"}], css:"rank", sort:"string", width:100},
		{ id:"employee", header:["Сотрудник", {content:"textFilter"}], css:"rank", sort:"string", width:100},
		{ id:"end", header:["Факт. время", {content:"textFilter"}], css:"rank", sort:"int", width:130},
		{ id:"status", header:["Статус", {content:"selectFilter"}], css:"rank", sort:"string", width:160}],
		data:taskData, 	on:{
			"onItemClick":function(id){ 
			showTask(this.getItem(id), currentUser);
			}
		}, select:true})
}

function limitedProjectTab(taskData, currentUser) {
		return (
			{id: 'projectsTab', header: 'Задачи', view:'datatable', resizeRow:true, columns:[
			{ id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
			{ id:"name", header:["Имя", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
			{ id:"projectName", header:["Проект", {content:"selectFilter"}], css:"rank", sort:"int", width:100},
			{ id:"estimated", header:["Пред. Время", {content:"textFilter"}], editor:"text", css:"rank", sort:"int", width:170},
			{ id:"urgency", header:["Срочность", {content:"selectFilter"}], css:"rank", sort:"string", width:100},
			{ id:"end", header:["Факт. время", {content:"textFilter"}], css:"rank", sort:"int", width:130},
			{ id:"status", header:["Статус", {content:"selectFilter"}], css:"rank", sort:"string", width:160}],
			data:taskData, 	on:{
				"onItemClick":function(id){ 
				showTask(this.getItem(id), currentUser);
				}
			}, select:true})

}