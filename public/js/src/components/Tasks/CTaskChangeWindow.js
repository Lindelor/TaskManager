import getChangeTaskWindowView from './TaskChangeWindow.js';
import taskModel from '../../models/taskModel.js';
import {TASK_STATUS} from '../../models/entities/task.js';
import projectModel from '../../models/projectModel.js';

export default class CTaskChangeWindow {
    constructor() {
        this.view;
    }

    init() {}

    config(task, projectsNames, employees, statuses, urgencies) {

        return getChangeTaskWindowView(task, projectsNames, employees, statuses, urgencies);

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

        this.setButtonVal();

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal()

            taskModel.getTaskByID(Number(val.taskChangeId)).then((task) => {
                projectModel.getProjectByName(val.taskChangeProjectName).then((newProject) => {
                    if (this.validation(val)) {
                    task.description = val.taskChangeDescription;
                    task.projectName = val.taskChangeProjectName;
                    task.projectId = newProject.id;
                    task.employee = val.taskChangeEmployee;
                    task.end = Number(val.taskChangeFact);
                    task.estimated = Number(val.taskChangeEstimated);
                    taskModel.updateTask(task).then((result) => {
                        this.refreshTable();
                        this.view.form.clear();
                        this.view.window.close();
                    });
                    }
                })
            })        
        })

        this.view.windowReconButton.attachEvent('onItemClick', () => {
            let val = this.getVal();
            taskModel.getTaskByID(Number(val.taskChangeId)).then((task) => {
                task.status = TASK_STATUS.reconciliation;
                taskModel.updateTask(task).then((result) => {
                    this.refreshTable();
                    this.view.form.clear();
                    this.view.window.close();
                })
            })
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })

        this.view.windowRemoveButton.attachEvent('onItemClick', () => {
            let id = Number(this.getVal().taskChangeId);
            taskModel.deleteTask(id).then((result) => {
                this.refreshTable();
                this.view.form.clear();
                this.view.window.close();
            });
        });
    }

    refreshTable() {
        taskModel.getTasks().then((res) => {
            $$("tasksTable").clearAll();
            $$("tasksTable").parse(res);
            $$("tasksTable").refreshFilter();
        })
    }

    getVal() {
        return this.view.form.getValues();
    }

    setButtonVal() {
        let status = this.getVal().taskChangeStatus;
        if (status == TASK_STATUS.fresh) {
            this.view.windowConfirmButton.define({
                value:"Назначить",
            });
        } else if (status == TASK_STATUS.haveEmployee) {
            this.view.windowConfirmButton.define({
                value:"Начать работу",
            });
        } else if (status == TASK_STATUS.inProgress) {
            this.view.windowConfirmButton.define({
                value:"Завершить",
            });
        } else {
            this.view.windowConfirmButton.define({
                value:"Переназначить",
            });
        }
        this.view.windowConfirmButton.refresh();
    }

    validation(val) {
        let status = val.taskChangeStatus;
        let estimated = val.taskChangeEstimated;
        let end = val.taskChangeFact;
        let description = val.taskChangeDescription;
        
        if (status == TASK_STATUS.fresh || status == TASK_STATUS.reconciliation) {

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

            if (estimated == '' || isNaN(Number(estimated)) || Number(estimated) <= 0) {
                webix.message('Укажите плановые часы!');
                return false;
            }

            return true;

        } else if (status == TASK_STATUS.inProgress) {

            if (description == '') {
                webix.message('Заполните описание!');
                return false;
            }

            if (estimated == '' || isNaN(Number(estimated)) || Number(estimated) <= 0) {
                webix.message('Укажите плановые часы!');
                return false;
            }

            if (end == '' || isNaN(Number(end)) || Number(end) <= 0) {
                webix.message('Укажите фактические часы!')
                return false;
            }

        } else if (status == TASK_STATUS.done) {

            if (description == '') {
                webix.message('Заполните описание!');
                return false;
            }

        }

        return true;
    }
}