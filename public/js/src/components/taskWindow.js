import {TASK_STATUS, URGENCY} from '../models/entities/task.js';
import {POSITION} from '../models/entities/employee.js';
import taskModel from '../models/taskModel.js';
import employeeModel from '../models/employeeModel.js';
import projectModel from '../models/projectModel.js';
import {refreshTables} from '../components/projectsTab.js';

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
								{ view:"text", label:"ID", name:"taskId", value:task.id, readonly:true, labelWidth:120},
								{ view:"textarea", label:"Описание", name:"taskDescription", value:task.description, height: 120, labelWidth:120},
								{ view:"select", label:"Проект", options:names, name:"taskProjectName", value:task.projectName, labelWidth:120},
								{ view:"select", label:"Сотрудник", options:employees, name:"employee", value:task.employee, labelWidth:120},
								{ view:"select", label:"Статус", options:statuses, name:"taskStatus", labelWidth:120, value:task.status, disabled:true},
								{ view:"select", label:"Срочность", options:urgencies, name:"taskUrgency", labelWidth:120, value: task.urgency},
								{ view:"text", label:"Ожид. Время", name:"taskEstimated", value:task.estimated, labelWidth:120},
								{ view:"text", label:"Факт. Время", name:"taskFact", value:task.end, labelWidth:120},
								{ margin:5, cols:[
									{ view:"button", value:"Изменить" , css:"webix_primary", click:saveChange},
									{ view:"button", value:"Завершить" , css:"webix_primary", click:closeTask},
									{ view:"button", value:"На согласование" , css:"webix_primary", click:toReconcilation},
									{ view:"button", value:"Переназначить" , css:"webix_primary", click:toFresh},
									{ view:"button", value:"Удалить" , css:"webix_primary", click:deleteTask}, 
									{ view:"button", value:"Отменить" , css:"webix_primary", click:discard},
								]}
							],
							rules:{
								"taskDescription":webix.rules.isNotEmpty,
								"taskEstimated":webix.rules.isNumber,
								"taskFact":webix.rules.isNumber,
							  },
							  elementsConfig:{
								on:{
								  "onChange":function(){
									this.validate();
								  }
								}
							  }
						}
						}).show()
					)
				})

			})
		})
	})
	
}

let toFresh = function() {
	let newValue = $$('changeForm').getValues();
	if (newValue.taskDescription == '') {
		alert("Заполните описание");
	} else {
	taskModel.getTaskByID(Number(newValue.taskId)).then((task) => {
		
			projectModel.getProjectByName(newValue.taskProjectName).then((newProject) => {
				task.description = newValue.taskDescription;
				task.projectName = newValue.taskProjectName;
				task.projectId = newProject.id;
				task.urgency = newValue.taskUrgency;
				task.employee = newValue.employee;
				task.status = TASK_STATUS.fresh;
				task.end = '';
				task.estimated = '';
				taskModel.updateTask(task).then(refreshTables());
				$$("changeWindow").close();
			})
	})
}
};

let saveChange = function() {
    let newValue = $$('changeForm').getValues();
	taskModel.getTaskByID(Number(newValue.taskId)).then((task) => {
		if ((newValue.taskFact != '' && Number(newValue.taskFact) < 0) || (newValue.taskEstimated != '' && Number(newValue.taskEstimated) < 0) || newValue.taskEstimated == '' 
		|| isNaN(Number(newValue.taskFact)) || isNaN(Number(newValue.taskEstimated))) {
			alert("Укажите корректное время");
		} else {
			projectModel.getProjectByName(newValue.taskProjectName).then((newProject) => {
				task.description = newValue.taskDescription;
				task.projectName = newValue.taskProjectName;
				task.projectId = newProject.id;
				if (newValue.taskEstimated != '') {
					task.estimated = Number(newValue.taskEstimated);
				}
				task.urgency = newValue.taskUrgency;
				task.employee = newValue.employee;
	
				if (newValue.taskFact != '') {
					task.end = Number(newValue.taskFact);
				}
	
				taskModel.updateTask(task).then(refreshTables());
				$$("changeWindow").close();
			})
		}

	})
};

let closeTask = function() {
	if ($$("changeForm").validate()) {
	let newValue = $$('changeForm').getValues();
	taskModel.getTaskByID(Number(newValue.taskId)).then((task) => {
		if (newValue.taskFact != '' && Number(newValue.taskFact) > 0 && newValue.taskEstimated != '' && Number(newValue.taskEstimated) > 0) {
			projectModel.getProjectByName(newValue.taskProjectName).then((newProject) => {
				task.description = newValue.taskDescription;
				task.projectName = newValue.taskProjectName;
				task.projectId = newProject.id;
				task.estimated = Number(newValue.taskEstimated);
				task.urgency = newValue.taskUrgency;
				task.employee = newValue.employee;
				task.end = Number(newValue.taskFact);
				task.status = TASK_STATUS.done;
				taskModel.updateTask(task).then(refreshTables());
				$$("changeWindow").close();
			})
		} else {
			alert('Укажите корректное время');
		}
	})
}
};

let toReconcilation = function() {
	if ($$("changeForm").validate()) {
	let newValue = $$('changeForm').getValues();
	taskModel.getTaskByID(Number(newValue.taskId)).then((task) => {
		if (newValue.taskFact != '' && Number(newValue.taskFact) > 0 && newValue.taskEstimated != '' && Number(newValue.taskEstimated) > 0) {
			projectModel.getProjectByName(newValue.taskProjectName).then((newProject) => {
				task.description = newValue.taskDescription;
				task.projectName = newValue.taskProjectName;
				task.projectId = newProject.id;
				task.estimated = Number(newValue.taskEstimated);
				task.urgency = newValue.taskUrgency;
				task.employee = newValue.employee;
				task.end = Number(newValue.taskFact);
				task.status = TASK_STATUS.reconciliation;
				taskModel.updateTask(task).then(refreshTables());
				$$("changeWindow").close();
			})
		} else {
			alert('Укажите корректное время');
		}
	})
}
};

let deleteTask = function() {
	let value = Number($$('changeForm').getValues().taskId);
	taskModel.deleteTask(value);
	$$("changeWindow").close();
	refreshTables();
};

let discard = function() {
	$$("changeWindow").close();
};