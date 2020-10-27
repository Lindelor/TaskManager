import {TASK_STATUS, URGENCY} from '../models/entities/task.js';
import {POSITION} from '../models/entities/employee.js';
import taskModel from '../models/taskModel.js';
import employeeModel from '../models/employeeModel.js';
import projectModel from '../models/projectModel.js';

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
				{ view:"text", label:"ID проекта", name:"taskProjectName", value:task.projectName, readonly:true, labelWidth:120},
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
				"taskProjectName":webix.rules.isNumber,
				"taskEstimated":webix.rules.isNumber,
				"taskFact":webix.rules.isNumber,
			  }
		}
		}).show()
	)
	
}

function fullShowTask(task) {
	employeeModel.getEmployeesIdFIO().then((employees) => {
		taskModel.getTaskStatuses().then((statuses) => {
			taskModel.getTaskUrgencies().then((urgencies) => {
				projectModel.getProjectsNames().then((names) => {
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
								{ view:"select", label:"Проект", options:names, name:"taskProjectName", value:task.projectName, labelWidth:120},
								{ view:"select", label:"Сотрудник", options:employees, name:"employee", value:task.employee, labelWidth:120},
								{ view:"select", label:"Статус", options:statuses, name:"taskStatus", labelWidth:120, value:task.status},
								{ view:"select", label:"Срочность", options:urgencies, name:"taskUrgency", labelWidth:120, value: task.urgency},
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
								"taskEstimated":webix.rules.isNumber,
								"taskFact":webix.rules.isNumber,
							  }
						}
						}).show()
					)
				})

			})
		})
	})
	
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