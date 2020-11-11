import CMainTab from './src/components/CMainTab.js';
import employeeModel from './src/models/employeeModel.js';
import authModel from './src/models/authModel.js';

//Текущий пользователь и сотрудник
let currentUserPromise = authModel.getUserById(12);
let currentEmployeePromise = employeeModel.getEmployeeById(12);

//Инициализация приложения
currentEmployeePromise.then((currentEmployee) => {
	currentUserPromise.then((currentUser) => {
		let mainTab = new CMainTab(currentEmployee, currentUser);
		mainTab.init();
		webix.ui(mainTab.config());
		mainTab.attachEvents();
	})
})


