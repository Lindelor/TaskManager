import projectModel from '../../models/projectModel.js';
import {POSITION} from '../../models/entities/employee.js';
import {getProjectsTabView} from './ProjectsTabView.js';
import CProjectChangeWindow from './ChangeWindow/CProjectChangeWindow.js';
import employeeModel from '../../models/employeeModel.js';

//Компонент таба проектов
export default class ProjectsTab {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
        this.projectWindow;
    }

    //Инициализация компонента
    init() { 

    }

    //Возвращение конфигурации компонента
    config() {
        return getProjectsTabView();
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            table : $$('projectsTable'),
        };

        //вызов окна редактора проекта
        this.view.table.attachEvent('onItemClick', (id) => {
            employeeModel.getAllTeamLeads().then((result) => {
                let projectChangeWindow = new CProjectChangeWindow;
                projectChangeWindow.init(this.currentEmployee);
                let project = this.view.table.getItem(id);
                webix.ui(projectChangeWindow.config(project, result)).show();
                projectChangeWindow.attachEvents();
                this.projectWindow = $$('projectChangeWindow');
                this.projectWindow.attachEvent('onDestruct', () => {
                    this.refreshTable();
                    projectChangeWindow = null;
                    this.projectWindow = null;
                })

            })
        })

    }

    //Обновление данных в таблице проектов
    refreshTable() {
        if (this.currentEmployee.position == POSITION.teamLead) {
            projectModel.getProjects().then((result) => {
                this.view.table.clearAll();
                this.view.table.parse(result);
                this.view.table.refreshFilter();
            })
        } else {
            projectModel.getLimitedProjectsData(this.currentEmployee).then((result) => {
                this.view.table.clearAll();
                this.view.table.parse(result);
                this.view.table.refreshFilter();
            })
        }
    }

}