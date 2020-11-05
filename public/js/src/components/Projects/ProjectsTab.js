import projectModel from '../../models/projectModel.js';
import {POSITION} from '../../models/entities/employee.js';
import {getProjectsTabView} from './ProjectsTabView.js';
import CProjectChangeWindow from './CProjectChangeWindow.js';

export default class ProjectsTab {
    constructor() {
        this.view;
        this.currentEmployee;
    }

    init() { 

    }

    config(currentEmployee) {
        this.currentEmployee = currentEmployee;
        return getProjectsTabView();
    }

    attachEvents() {

        this.view = {
            table : $$('projectsTable'),
        };

        this.view.table.attachEvent('onItemClick', (id) => {
            projectModel.getAllTeamLeadsIdFIO().then((result) => {
                let projectChangeWindow = new CProjectChangeWindow;
                projectChangeWindow.init();
                let project = this.view.table.getItem(id);
                webix.ui(projectChangeWindow.config(project, this.currentEmployee, result)).show();
                projectChangeWindow.attachEvents();
            })
        })

        this.view.table.attachEvent('onViewShow', () => {
            $$('addTask').hide();
            $$('addProject').show();
            $$('registerUser').hide();
        })

    }

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