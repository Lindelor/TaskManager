import {getMainTab} from './src/components/mainTab.js';
import {getUserTab} from './src/components/userTab.js';
import employeeModel from './src/models/employeeModel.js';
import authModel from './src/models/authModel.js';
import projectModel from './src/models/projectModel.js';
import TaskTab from './src/components/Tasks/TasksTab.js';
import ProjectsTab from './src/components/Projects/ProjectsTab.js';
import EmployeesTab from './src/components/Employees/EmployeesTab.js';
import { POSITION } from './src/models/entities/employee.js';

let currentUserPromise = authModel.getUserById(12);
let currentEmployeePromise = employeeModel.getEmployeeById(12);
let currentUser;
export let currentEmployee;


currentEmployeePromise.then((val) => {
	let taskTab = new TaskTab();
	taskTab.init();
	currentEmployee = val;
	let projectsTab = new ProjectsTab();
	projectsTab.init();
	let employeesTab = new EmployeesTab();
	employeesTab.init();	

	currentUserPromise.then((userVal) => {
		currentUser = userVal;
		let taskTable = taskTab.config(val);
		let projectsTable =  projectsTab.config(val);
		let currentCells = [taskTable, projectsTable];
		if (val.position == POSITION.teamLead) {
			let employeesTable = employeesTab.config(val);
			currentCells.push(employeesTable);
		}
	
		webix.ui(getMainTab(currentEmployee, currentUser, currentCells));
		taskTab.attachEvents();
		taskTab.refreshTable();
		projectsTab.attachEvents();
		projectsTab.refreshTable();
		if (val.position == POSITION.teamLead) {
			employeesTab.attachEvents();
			employeesTab.refreshTable();
			$$('addTask').show();
		}
	})
})


