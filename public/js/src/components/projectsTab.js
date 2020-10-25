import {Employee, POSITION} from '../models/entities/employee.js';
import showTask from './taskWindow.js';

// возвращает webix конфигурацию таба проектов
export function getProjectsTab(taskData) {
    return (
		{id: 'projectsTab', header: 'Задачи', view:'datatable', resizeRow:true, columns:[
		{ id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:50},
		{ id:"name", header:["Имя", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
		{ id:"projectid", header:["Проект", {content:"selectFilter"}], css:"rank", sort:"int", width:100},
		{ id:"estimated", header:["Пред. Время", {content:"textFilter"}], editor:"text", css:"rank", sort:"int", width:170},
		{ id:"urgency", header:["Срочность", {content:"selectFilter"}], css:"rank", sort:"string", width:100},
		{ id:"employee", header:["Сотрудник", {content:"textFilter"}], css:"rank", sort:"string", width:100},
		{ id:"end", header:["Факт. время", {content:"textFilter"}], css:"rank", sort:"int", width:130},
		{ id:"status", header:["Статус", {content:"selectFilter"}], css:"rank", sort:"string", width:160}],
		data:taskData, 	on:{
			"onItemClick":function(id){ 
			showTask(this.getItem(id), employee2);
			}
		}, select:true})
}

function fullProjectTab(taskData) {

}


let employee1 = new Employee(11, "Ivan", "Ivanov", "Ivanovich", POSITION.manager, "834964843543", 11);
let employee2 = new Employee(12, "Iv", "Iva", "Ivanovi", POSITION.teamLead, "74386789347", 12);