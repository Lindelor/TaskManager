import {TASK_STATUS, URGENCY} from '../models/entities/task.js';
import {POSITION} from '../models/entities/employee.js'

export default function showTask(task, currentEmployee) {
	if (currentEmployee.position === POSITION.teamLead) {
		return fullShowTask(task);
	} else {
		return limitedShowTask(task);
	}
}

function limitedShowTask(task) {
	return (
		webix.ui({
		view:"window",
		id:"changeWindow",
		head:"Задача " + task.name,
		modal:true,
		position:"center",
		width:1000,
		body:{
			id:"changeForm",
			view:"form", 
			elements:[
				{ view:"text", label:"Название", name:"taskName", value:task.name, readonly:true, labelWidth:120},
				{ view:"textarea", label:"Описание", name:"taskDescriprion", value:task.description, readonly:true, height: 150, labelWidth:120},
				{ view:"text", validate:webix.rules.isNumber, label:"ID проекта", name:"taskProjectId", value:task.projectid, readonly:true, labelWidth:120},
				{ view:"select", label:"Статус", options:[TASK_STATUS.haveEmployee, TASK_STATUS.inProgress, TASK_STATUS.done], name:"taskStatus", labelWidth:120, value:task.status},
				{ view:"select", label:"Срочность", options:[URGENCY.ASAP, URGENCY.Low, URGENCY.NVM], name:"taskUrgency", labelWidth:120, disabled:true, value: task.urgency},
				{ view:"text", label:"Ожид. Время", name:"taskEstimated", value:task.estimated, labelWidth:120},
				{ view:"text", label:"Факт. Время", name:"taskFact", value:task.end, labelWidth:120},
				{ margin:5, cols:[
					{ view:"button", value:"Изменить" , css:"webix_primary", click:saveChange},
					{ view:"button", value:"Отменить" , css:"webix_primary", click:discard},
				]}
			],

			rules:{
				"taskName":webix.rules.isNotEmpty,
				"taskDescription":webix.rules.isNotEmpty,
				"taskProjectId":webix.rules.isNumber,
				"taskEstimated":webix.rules.isNumber,
				"taskFact":webix.rules.isNumber,
			  }
		}
		}).show()
	)
	
}

function fullShowTask(task) {
	return (
		webix.ui({
		view:"window",
		id:"changeWindow",
		head:"Задача " + task.name,
		modal:true,
		position:"center",
		width:1000,
		body:{
			id:"changeForm",
			view:"form", 
			elements:[
				{ view:"text", label:"Название", name:"taskName", value:task.name, readonly:true, labelWidth:120},
				{ view:"textarea", label:"Описание", name:"taskDescriprion", value:task.description, height: 150, labelWidth:120},
				{ view:"text", label:"ID проекта", name:"taskProjectId", value:task.projectid, labelWidth:120},
				{ view:"select", label:"Сотрудник", options:['1', '2', '11', '12'], name:"employee", value:task.employee, labelWidth:120},
				{ view:"select", label:"Статус", options:[TASK_STATUS.fresh, TASK_STATUS.haveEmployee, TASK_STATUS.inProgress, TASK_STATUS.done, TASK_STATUS.reconciliation], name:"taskStatus", labelWidth:120, value:task.status},
				{ view:"select", label:"Срочность", options:[URGENCY.ASAP, URGENCY.Low, URGENCY.NVM], name:"taskUrgency", labelWidth:120, value: task.urgency},
				{ view:"text", label:"Ожид. Время", name:"taskEstimated", value:task.estimated, labelWidth:120},
				{ view:"text", label:"Факт. Время", name:"taskFact", value:task.end, labelWidth:120},
				{ margin:5, cols:[
					{ view:"button", value:"Изменить" , css:"webix_primary", click:saveChange},
					{ view:"button", value:"Удалить" , css:"webix_primary", click:deleteTask}, 
					{ view:"button", value:"Отменить" , css:"webix_primary", click:discard},
				]}
			],
			rules:{
				"taskName":webix.rules.isNotEmpty,
				"taskDescription":webix.rules.isNotEmpty,
				"taskProjectId":webix.rules.isNumber,
				"taskEstimated":webix.rules.isNumber,
				"taskFact":webix.rules.isNumber,
			  }
		}
		}).show()
	)
	
}

let saveChange = function() {
    let newValue = $$("changeForm").getValues();
	$$("changeForm").clear();
    $$("changeWindow").close();
	alert('Изменить');
};

let deleteTask = function() {
	alert("Будет удален");
	$$("changeForm").clear();
    $$("changeWindow").close();
};

let discard = function() {
	$$("changeWindow").close();
}