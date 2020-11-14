import getMainTab from './MainTabView.js';
import ProjectsTab from './Projects/ProjectsTab.js';
import EmployeesTab from './Employees/EmployeesTab.js';
import TasksTab from './Tasks/TasksTab.js';
import { POSITION } from '../models/entities/employee.js';
import projectModel from '../models/projectModel.js';
import taskModel from '../models/taskModel.js';
import employeeModel from '../models/employeeModel.js';
import CTaskCreateWindow from './Tasks/CreateWindow/CTaskCreateWindow.js';
import CProjectCreateWindow from './Projects/CreateWindow/CProjectCreateWindow.js';
import CRegisterUserWindow from './Employees/CreateWindow/CRegisterUserWindow.js';
import CUserInfo from './UserInfo/CUserInfo.js';

//Компонент основного окна
export default class CMainTab {
    constructor(currentEmployee, currentUser) {
        this.view;
        this.currentEmployee = currentEmployee;
        this.currentUser = currentUser;
        this.projectsTab = new ProjectsTab(this.currentEmployee);
        this.employeesTab = new EmployeesTab();
        this.tasksTab = new TasksTab(this.currentEmployee);
        this.addProjectWindow;
        this.addTaskWindow;
        this.addEmployeeWindow;
    }

    //Инициализация компонента
    init() { 
        this.projectsTab.init();
        this.employeesTab.init();
        this.tasksTab.init();
    }

    //Возвращение вебикс конфигурации компонента
    config() {
        let currentCells = [this.tasksTab.config(), this.projectsTab.config()];
        if (this.currentEmployee.position == POSITION.teamLead) {
            currentCells.push(this.employeesTab.config());
        }
        return getMainTab(this.currentEmployee, currentCells);
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.projectsTab.attachEvents();
        this.tasksTab.attachEvents();
        this.tasksTab.refreshTable();
        this.projectsTab.refreshTable();

        this.view = {
            mainView : $$("mainView"),
            addTaskButton: $$("addTask"),
            addProjectButton: $$("addProject"),
            addUserButton: $$("registerUser"),
            userInfoButton: $$("userButton"),
        };

        //Привязка тимлидских событий
        if (this.currentEmployee.position == POSITION.teamLead) {
            this.employeesTab.attachEvents();
            this.employeesTab.refreshTable();

            //Обновление всех данных в таблицах при изменении сотрудников
            this.employeesTab.view.table.attachEvent('onAfterLoad', () => {
                this.projectsTab.refreshTable();
                this.tasksTab.refreshTable();
            })

            //Привязка кнопки к текущей вкладке
            this.employeesTab.view.table.attachEvent('onViewShow', () => {
                if (this.currentEmployee.position == POSITION.teamLead) {
                    this.view.addTaskButton.hide();
                    this.view.addProjectButton.hide();
                    this.view.addUserButton.show();
                }
            })
        }

        //Вызов окна с информацией о текущем сотруднике
        this.view.userInfoButton.attachEvent('onItemClick', () => {
            let userInfoWindow = new CUserInfo(this.currentEmployee);
            userInfoWindow.init();
            userInfoWindow.config().show();
            userInfoWindow.attachEvents();
            this.infoWindow = $$("infoWindow");
            this.infoWindow.attachEvent('onDestruct', () => {
                userInfoWindow = null;
                this.infoWindow = null;
            })
        })

        //Вызов окна добавления задачи
        this.view.addTaskButton.attachEvent('onItemClick', () => {
            projectModel.getProjectsNames().then((projectsNames) => {
                taskModel.getTaskUrgencies().then((urgencies) => {
                    let taskCreateWindow = new CTaskCreateWindow();
                    taskCreateWindow.init();
                    taskCreateWindow.config(projectsNames, urgencies).show();
                    taskCreateWindow.attachEvents();
                    this.addTaskWindow = $$("addTaskWindow");
                    this.addTaskWindow.attachEvent('onDestruct', () => {
                        this.tasksTab.refreshTable();
                        taskCreateWindow = null;
                        this.addTaskWindow = null;
                    })
                });
            });
        })

        //Вызов окна регистрации сотрудника
        this.view.addUserButton.attachEvent('onItemClick', () => {
            employeeModel.getPositions().then((result) => {
                let registerUserWindow = new CRegisterUserWindow();
                registerUserWindow.init();
                registerUserWindow.config(result).show();
                registerUserWindow.attachEvents();
                this.addEmployeeWindow = $$("registerWindow");
                this.addEmployeeWindow.attachEvent('onDestruct', () => {
                    this.employeesTab.refreshTable();
                    registerUserWindow = null;
                    this.addEmployeeWindow = null;
                })
            });
        })

        //Вызов окна добавления проекта
        this.view.addProjectButton.attachEvent('onItemClick', () => {
            employeeModel.getAllTeamLeads().then((result) => {
                let projectCreateWindow = new CProjectCreateWindow();
                projectCreateWindow.init();
                projectCreateWindow.config(result).show();
                projectCreateWindow.attachEvents();
                this.addProjectWindow = $$("addProjectWindow");
                this.addProjectWindow.attachEvent('onDestruct', () => {
                    this.projectsTab.refreshTable();
                    projectCreateWindow = null;
                    this.addProjectWindow = null;
                })
            });
        })

        //Сокрытие кнопки создания задачи, если пользователь не тимлид
        if (this.currentEmployee.position != POSITION.teamLead) {
            this.view.addTaskButton.hide();
        }

        //Привязка кнопки к текущей вкладке
        this.projectsTab.view.table.attachEvent('onViewShow', () => {
            if (this.currentEmployee.position == POSITION.teamLead) {
                this.view.addTaskButton.hide();
                this.view.addProjectButton.show();
                this.view.addUserButton.hide();
            }
        })

        //Привязка кнопки к текущей вкладке
        this.tasksTab.view.table.attachEvent('onViewShow', () => {
            if (this.currentEmployee.position == POSITION.teamLead) {
                this.view.addTaskButton.show();
                this.view.addProjectButton.hide();
                this.view.addUserButton.hide();
            }
        })
    }

}