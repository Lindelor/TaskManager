import getChangeTaskWindowView from './TaskChangeWindow.js';
import taskModel from '../../models/taskModel.js';
import {Task, TASK_STATUS} from '../../models/entities/task.js';
import projectModel from '../../models/projectModel.js';
import employeeModel from '../../models/employeeModel.js';

export default class CTaskChangeWindow {
    constructor() {
        this.view;
    }

    init() {}

    config(task) {
        projectModel.getProjectsNames().then((names) => {
            employeeModel.getEmployeesIdFIO().then((employees) => {
                taskModel.getTaskStatuses().then((statuses) => {
                    taskModel.getTaskUrgencies().then((urgencies) => {
                        return getChangeTaskWindowView(task, names, employees, statuses, urgencies);
                    })
                })
            })
        })
    }

    attachEvents() {
        this.view = {
            window: $$('taskChangeWindow'),
            windowConfirmButton: $$('taskConfirmButton'),
            windowCancelButton: $$('taskCancelButton'),
            windowReconButton: $$('taskReconButton'),
            windowRemoveButton: $$('taskRemoveButton'),
            form: $$('taskChangeForm'),
        }

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal()

            taskModel.getTaskByID(val.taskChangeId).then((task) => {
                projectModel.getProjectByName(val.taskChangeProjectName).then((newProject) => {
                    if (this.validation(val, task)) {
                    task.description = val.taskChangeDescription;
                    task.projectName = val.taskChangeProjectName;
                    task.projectId = newProject.id;
                    task.urgency = val.taskUrgency;
                    task.employee = val.taskChangeEmployee;
                    task.end = Number(val.taskChangeFact);
                    task.estimated = Number(val.taskChangeEstimated);
                    taskModel.updateTask(task);
                    this.view.form.clear();
                    this.view.window.hide();
                    this.onChange();
                }
                })
            })        
        })

        this.view.windowReconButton.attachEvent('onItemClick', () => {
            let val = this.getVal();
            taskModel.getTaskByID(val.taskChangeId).then((task) => {
                task.status = TASK_STATUS.reconciliation;
                taskModel.updateTask(task);
                this.view.form.clear();
                this.view.window.hide();
                this.onChange();
            })
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.hide();
        })

        this.view.windowRemoveButton.attachEvent('onItemClick', () => {
            let id = this.getVal().taskChangeId;
            taskModel.deleteTask(id);
            this.view.form.clear();
            this.view.window.hide();
            this.onChange();
        })
    }

    getVal() {
        return this.view.form.getValues();
    }

    setVal(values) {
        this.view.form.setValues(values);
    }

    onChange() {
        taskModel.getTasks().then((taskData) => {
            $$('projectsTab').clearAll();
            $$('projectsTab').parse(taskData);
        })
    }

    validation(val, task) {
        let status = val.taskChangeStatus;
        let estimated = val.taskChangeEstimated;
        let end = val.taskChangeFact;
        let description = val.taskChangeDescription;
        
        if (status == TASK_STATUS.fresh) {

            if (description == '') {
                webix.message('Заполните описание!');
                return false;
            }

            return true;

        } else if (status == TASK_STATUS.haveEmployee) {

            if (description == '') {
                webix.message('Заполните описание!');
                return false;
            }

            if (estimated == '') {
                webix.message('Укажите плановые часы!');
                return false;
            }

            return true;

        } else if (status == TASK_STATUS.inProgress) {

            if (description == '') {
                webix.message('Заполните описание!');
                return false;
            }

            if (estimated == '') {
                webix.message('Укажите плановые часы!');
                return false;
            }

            if (end == '') {
                webix.message('Укажите фактические часы!')
            }

        } else if (task.status == TASK_STATUS.done) {

            if (description == '') {
                webix.message('Заполните описание!');
                return false;
            }

        } 

        return true;
    }
}