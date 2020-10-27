import {getProjectsTab} from './src/components/projectsTab.js';
import taskModel from './src/models/taskModel.js';
import {getMainTab} from './src/components/mainTab.js';
import {getUserTab} from './src/components/userTab.js';
import employeeModel from './src/models/employeeModel.js';
import authModel from './src/models/authModel.js';

let currentUser = authModel.getUserById(12);
let currentEmployee = employeeModel.getEmployeeById(12);
currentEmployee.then((val) => {
	let currentCells = [getUserTab(val, currentUser),
		getProjectsTab(taskModel.getTasks(), val)];

	webix.ui(getMainTab(val, currentUser, currentCells));
})

