import getChangeTaskWindowView from './TaskChangeWindow.js';
import taskModel from '../../models/taskModel.js';
import {TASK_STATUS} from '../../models/entities/task.js';
import projectModel from '../../models/projectModel.js';
import { POSITION } from '../../models/entities/employee.js';

export default class CTaskChangeWindow {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
    }

    init() {}

    config(task, employees, urgencies) {

        return getChangeTaskWindowView(task, employees, urgencies);

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
                    if (this.currentEmployee.position == POSITION.teamLead) {
                        task.urgency = val.taskChangeUrgency;
                    }
                    taskModel.updateTask(task).then((result) => {
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
                this.view.form.clear();
                this.view.window.close();
            });
        });
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
            if (this.currentEmployee.position != POSITION.teamLead) {
                this.view.windowConfirmButton.define("hidden", true);
            }
        }
        if (this.currentEmployee.position != POSITION.teamLead) {
            this.view.windowRemoveButton.define("hidden", true);
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
                webix.message({type:"error", text:'Заполните описание!'});
                return false;
            }

            return true;

        } else if (status == TASK_STATUS.haveEmployee) {

            if (description == '') {
                webix.message({type:"error", text:'Заполните описание!'});
                return false;
            }

            if (estimated == '' || isNaN(Number(estimated)) || Number(estimated) <= 0) {
                webix.message({type:"error", text:'Укажите плановые часы!'});
                return false;
            }

            return true;

        } else if (status == TASK_STATUS.inProgress) {

            if (description == '') {
                webix.message({type:"error", text:'Заполните описание!'});
                return false;
            }

            if (estimated == '' || isNaN(Number(estimated)) || Number(estimated) <= 0) {
                webix.message({type:"error", text:'Укажите плановые часы!'});
                return false;
            }

            if (end == '' || isNaN(Number(end)) || Number(end) <= 0) {
                webix.message({type:"error", text:'Укажите фактические часы!'})
                return false;
            }

        } else if (status == TASK_STATUS.done) {

            if (description == '') {
                webix.message({type:"error", text:'Заполните описание!'});
                return false;
            }

        }

        return true;
    }
}