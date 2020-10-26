import employeeModel from '../models/employeeModel.js';
import {POSITION} from '../models/entities/employee.js';

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
					{view: 'button', id: 'addTask', value:"Создать задачу", width:200, click:function(){alert("Создать задачу")}},
					{view: 'button', id: 'addProject', value:"Создать проект", width:200, click:function(){alert("Создать")}},
					{view: 'button', id: 'removeProject', value:"Удалить проект", width:200, click:function(){alert("Удалить")}},
					{view: 'button', id: 'registerUser', value:"Зарегистрировать", width:200, click:function(){getRegisterForm();}},
					{id: 'spaceFiller', fillspace:true},
					{view: 'button', id: 'userButton', value:user.email, width:150 },
					{view: 'button', id: 'logoutButton', value:'Выйти', width:150, click:function(){alert("Вышел")} },
				],
			},
			{view:"tabview", multiview:true, cells: cells}
		],
	}
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

//Возвращает и показывает форму регистрации
function getRegisterForm() {
	return (
		webix.ui({
		view:"window",
		id:"registerWindow",
		head:"Регистрация",
		modal:true,
		position:"center",
		body:{
			view:"form", 
			id:"registerForm",
			width:400,
			elements:[
				{ view:"text", label:"E-mail", name:"email"},
				{ view:"text", label:"Фамилия", name:"lastName"},
				{ view:"text", label:"Имя", name:"name"},
				{ view:"text", label:"Отчество", name:"patronymic"},
				{ view:"text", label:"Телефон", name:"phone"},
				{ view:"select", options:employeeModel.getPositions(), name:"position"},
				{ view:"text", type:"password", label:"Пароль", name:"password"},
				{ margin:5, cols:[
					{ view:"button", value:"Зарегистрировать" , css:"webix_primary", click:saveChange},
					{ view:"button", value:"Отменить" , css:"webix_primary", click:discard},
				]}
			]
		}
		}).show()
)
}

let saveChange = function() {
    let newValue = $$("registerForm").getValues();
	$$("registerForm").clear();
    $$("registerWindow").close();
	alert('Зарегистрировать');
};

let discard = function() {
	$$("registerWindow").close();
}