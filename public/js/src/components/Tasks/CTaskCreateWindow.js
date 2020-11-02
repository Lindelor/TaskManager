import getCreateTaskWindowView from './TaskCreateWindow.js';
import taskModel from '../../models/taskModel.js';
import {Task} from '../../models/entities/task.js';
import projectModel from '../../models/projectModel.js';

export default class CTaskCreateWindow {
    constructor() {
        this.view
    }

    init() { 

        projectModel.getProjectsNames().then((projectsNames) => {
            taskModel.getTaskUrgencies().then((urgencies) => {
                return getCreateTaskWindowView(projectsNames, urgencies).show();

            })
        })

    }

    config() {
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
                    taskModel.createTask(task);
                    this.view.window.hide();
                })

            }            
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.hide();
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
}