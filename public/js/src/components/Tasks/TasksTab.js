import getTasksView from './TasksTabView.js';
import taskModel from '../../models/taskModel.js';
import employeeModel from '../../models/employeeModel.js';
import CTaskChangeWindow from './CTaskChangeWindow.js';
import {POSITION} from '../../models/entities/employee.js';

export default class TasksTab {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
        this.taskChange;
    }

    init() { 

    }

    config() {
        return getTasksView(this.currentEmployee);
    }

    attachEvents() {

        this.view = {
            table : $$("tasksTable"),
        };

        this.view.table.attachEvent('onItemClick', (id) => {
            let taskChangeWindow = new CTaskChangeWindow(this.currentEmployee);
            taskChangeWindow.init();
            let task = this.view.table.getItem(id);

            employeeModel.getEmployeesIdFIO().then((employees) => {
                taskModel.getTaskUrgencies().then((urgencies) => {
                    webix.ui(taskChangeWindow.config(task, employees, urgencies)).show();
                    taskChangeWindow.attachEvents();
                    this.taskChange = $$("taskChangeWindow");
                    this.taskChange.attachEvent('onDestruct', () => {
                        this.refreshTable();
                    })
                })
            })

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