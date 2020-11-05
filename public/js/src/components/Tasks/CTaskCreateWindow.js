import getCreateTaskWindowView from './TaskCreateWindow.js';
import taskModel from '../../models/taskModel.js';
import {Task, TASK_STATUS} from '../../models/entities/task.js';
import projectModel from '../../models/projectModel.js';

export default class CTaskCreateWindow {
    constructor() {
        this.view;
    }

    init() { 

    }

    config(projectsNames, urgencies) {
        webix.ui(getCreateTaskWindowView(projectsNames, urgencies)).show();
    }

    attachEvents() {

        this.view = {
            window : $$("addTaskWindow"),
            windowConfirmButton : $$("CreateTaskButton"),
            windowCancelButton : $$("CancelTaskButton"),
            form : $$("addTaskForm"),
        };

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal()
            
            if(this.validation(val)) {               

                projectModel.getProjectByName(val.addTaskProject).then((finalProject) => {
                    let task = new Task(0, val.addTaskName, val.addTaskDescription, finalProject.name, finalProject.id, '', '', TASK_STATUS.fresh, '', val.addTaskUrgency);
                    taskModel.createTask(task).then((result) => {
                        this.refreshTable();
                    });
                    this.view.form.clear();
                    this.view.window.close();
                })

            }            
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

    getVal() {
        return this.view.form.getValues();
    }

    validation(task) {
        let name = task.addTaskName;
        let descr = task.addTaskDescription;
        
        if (name == '') {
            webix.message("Укажите название задачи!");
        } else {
            if (descr == '') {
                webix.message("Заполните описание задачи!");
            } else {
                return true;
            }
        }

        return false;
    }

    refreshTable() {
        taskModel.getTasks().then((res) => {
            $$("tasksTable").clearAll();
            $$("tasksTable").parse(res);
            $$("tasksTable").refreshFilter();
        })
    }
}