import {POSITION} from '../../models/entities/employee.js';

// возвращает webix конфигурацию таба задач
export default function getTasksView(currentUser) {
	if (currentUser.position == POSITION.teamLead) {
        cells.push(employeeCell);
        return tasksTab(cells);
	} else {
		return tasksTab(cells);
	}

}

//Возвращает таблицу с задачами
function tasksTab(currentCells) {
    return (
		{id: 'tasksTable', header: 'Задачи', view:'datatable', columns:currentCells,
        data:[]});
}

let cells = [
    { id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
    { id:"name", header:["Название", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
    { id:"projectName", header:["Проект", {content:"selectFilter"}], css:"rank", sort:"int", width:100},
    { id:"estimated", header:["Пред. Время", {content:"textFilter"}], editor:"text", css:"rank", sort:"int", width:170},
    { id:"urgency", header:["Срочность", {content:"selectFilter"}], css:"rank", sort:"string", width:100},
    { id:"end", header:["Факт. время", {content:"textFilter"}], css:"rank", sort:"int", width:130},
    { id:"status", header:["Статус", {content:"selectFilter"}], css:"rank", sort:"string", width:160}];

let employeeCell = { id:"employee", header:["Сотрудник", {content:"textFilter"}], css:"rank", sort:"string", width:100};