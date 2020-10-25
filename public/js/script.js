import {getProjectsTab} from './src/components/projectsTab.js';
import taskModel from './src/models/taskModel.js';
import {getMainTab} from './src/components/mainTab.js';
import {getUserTab} from './src/components/userTab.js';

let currentUser = {id:666, firstName:"Иван", lastName:"Иванов", patronymic:"Иванович", position:"Манагер", phone:"+77776667766", userId:"902", userName:"Ivan90", password:"admin", email:"ivan@gmail.com"};

let currentCells = [getUserTab(currentUser),
			getProjectsTab(taskModel.getTasks())];

webix.ui(getMainTab(currentUser, currentCells));