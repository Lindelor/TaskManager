import getTasksView from './TasksTabView.js';
import taskModel from '../../models/taskModel.js';
import employeeModel from '../../models/employeeModel.js';
import CTaskChangeWindow from './ChangeWindow/CTaskChangeWindow.js';
import {POSITION} from '../../models/entities/employee.js';

//Компонент таба задач
export default class TasksTab {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
        this.taskChange;
    }

    //Инициализация компонента
    init() { 

    }

    //Возвращение конфигурации компонента
    config() {
        return getTasksView(this.currentEmployee);
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            table : $$("tasksTable"),
        };

        //Вызов окна изменения задачи
        this.view.table.attachEvent('onItemClick', (id) => {
            let taskChangeWindow = new CTaskChangeWindow(this.currentEmployee);
            taskChangeWindow.init();
            let task = this.view.table.getItem(id);

            employeeModel.getEmployees().then((employees) => {
                taskModel.getTaskUrgencies().then((urgencies) => {
                    webix.ui(taskChangeWindow.config(task, employees, urgencies)).show();
                    taskChangeWindow.attachEvents();
                    taskChangeWindow.view.window.attachEvent('onDestruct', () => {
                        this.refreshTable();
                        taskChangeWindow.view.window = null;
                        taskChangeWindow = null;
                    })
                })
            })

        })

    }

    //Обновление данных в таблице задач
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