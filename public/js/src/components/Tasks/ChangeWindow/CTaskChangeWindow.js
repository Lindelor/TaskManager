import getChangeTaskWindowView from './TaskChangeWindow.js';
import taskModel from '../../../models/taskModel.js';
import {TASK_STATUS} from '../../../models/entities/task.js';
import projectModel from '../../../models/projectModel.js';
import { POSITION } from '../../../models/entities/employee.js';
import employeeModel from '../../../models/employeeModel.js';

//Компонент окна изменения таски
export default class CTaskChangeWindow {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
    }

    //Инициализация компонента
    init() {}

    //Возвращение вебикс конфигурации компонента
    config(task, employees, urgencies) {

        return getChangeTaskWindowView(task, employees, urgencies);

    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            window: $$('taskChangeWindow'),
            windowConfirmButton: $$('taskConfirmButton'),
            windowCancelButton: $$('taskCancelButton'),
            windowReconButton: $$('taskReconButton'),
            windowRemoveButton: $$('taskRemoveButton'),
            form: $$('taskChangeForm'),
        }

        //установка надписи на кнопке подтверждения
        this.setButtonVal();

        //Событие изменения задачи
        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.view.form.getValues();

            taskModel.getTaskByID(Number(val.taskChangeId)).then((task) => {
                projectModel.getProjectByName(val.taskChangeProjectName).then((newProject) => {
                    if (this.validation(val)) {
                        task.description = val.taskChangeDescription;
                        task.projectName = val.taskChangeProjectName;
                        task.projectId = newProject.id;
                        employeeModel.getEmployeeById(Number(val.taskChangeEmployee)).then((empl) => {
                            task.employee = empl;
                            task.end = Number(val.taskChangeFact);
                            task.estimated = Number(val.taskChangeEstimated);
                            if (this.currentEmployee.position == POSITION.teamLead) {
                                task.urgency = val.taskChangeUrgency;
                            }
                            if (task.status == TASK_STATUS.reconciliation) {
                                task.status = TASK_STATUS.fresh;
                            }
                            taskModel.updateTask(task).then((result) => {
                                projectModel.addEmployeeToProject(task.employee, newProject.id);
                                this.view.form.clear();
                                this.view.window.close();
                            });
                        })
                    }
                })
            })        
        })

        //Отправка задачи на согласование
        this.view.windowReconButton.attachEvent('onItemClick', () => {
            let val = this.view.form.getValues();
            taskModel.getTaskByID(Number(val.taskChangeId)).then((task) => {
                task.status = TASK_STATUS.reconciliation;
                projectModel.getTeamLeadByProjectId(task.projectId).then((resTeamLead) => {
                    task.employee = resTeamLead;
                    taskModel.updateTask(task).then((result) => {
                        this.view.form.clear();
                        this.view.window.close();
                    })
                })
            })
        })

        //Закрытие окна
        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })

        //Удаление задачи
        this.view.windowRemoveButton.attachEvent('onItemClick', () => {
            let id = Number(this.view.form.getValues().taskChangeId);
            taskModel.deleteTask(id).then((result) => {
                this.view.form.clear();
                this.view.window.close();
            });
        });
    }

    //Установка надписи на кнопке изменения в зависимости от статуса задачи
    setButtonVal() {
        let status = this.view.form.getValues().taskChangeStatus;
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

    //Валидация данных в форме
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