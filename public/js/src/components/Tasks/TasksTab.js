import getTasksView from './TasksTabView.js';
import taskModel from '../../models/taskModel.js';
import projectModel from '../../models/projectModel.js';
import employeeModel from '../../models/employeeModel.js';
import CTaskChangeWindow from './CTaskChangeWindow.js';
import {POSITION} from '../../models/entities/employee.js';

export default class TasksTab {
    constructor() {
        this.view;
        this.currentEmployee;
    }

    init() { 

    }

    config(currentEmployee) {
        this.currentEmployee = currentEmployee;
        return getTasksView(currentEmployee);
    }

    attachEvents() {

        this.view = {
            table : $$("tasksTable"),
        };

        this.view.table.attachEvent('onItemClick', (id) => {
            let taskChangeWindow = new CTaskChangeWindow();
            taskChangeWindow.init();
            let task = this.view.table.getItem(id);
            projectModel.getProjectsNames().then((projectsNames) => {
                employeeModel.getEmployeesIdFIO().then((employees) => {
                    taskModel.getTaskUrgencies().then((urgencies) => {
                        webix.ui(taskChangeWindow.config(task, projectsNames, employees, urgencies)).show();
                        taskChangeWindow.attachEvents();
                    })
                })
            })
        })

        this.view.table.attachEvent('onViewShow', () => {
            $$('addTask').show();
            $$('addProject').hide();
            $$('registerUser').hide();
        })

    }

    refreshTable() {
        if (this.currentEmployee.position == POSITION.teamLead) {
            taskModel.getTasks().then((result) => {
                this.view.table.clearAll();
                this.view.table.parse(result);
                this.view.table.refreshFilter();
            })
        } else {
            taskModel.getEmployeeTasks(this.currentEmployee).then((result) => {
                this.view.table.clearAll();
                this.view.table.parse(result);
                this.view.table.refreshFilter();
            })
        }
    }

}