import {getProjectsTab} from './src/components/projectsTab.js';
import taskModel from './src/models/taskModel.js';
import {getMainTab} from './src/components/mainTab.js';
import {getUserTab} from './src/components/userTab.js';
import employeeModel from './src/models/employeeModel.js';
import authModel from './src/models/authModel.js';

let currentUserPromise = authModel.getUserById(12);
let currentEmployeePromise = employeeModel.getEmployeeById(12);
let currentUser;
export let currentEmployee;


currentEmployeePromise.then((val) => {
	currentEmployee = val;
	currentUserPromise.then((userVal) => {
		currentUser = userVal;
		let currentCells = [getUserTab(val, currentUser),
			getProjectsTab(taskModel.getTasks(), val)];
	
		webix.ui(getMainTab(currentEmployee, currentUser, currentCells));
	})
})
