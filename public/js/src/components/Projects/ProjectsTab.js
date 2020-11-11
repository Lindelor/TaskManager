import projectModel from '../../models/projectModel.js';
import {POSITION} from '../../models/entities/employee.js';
import {getProjectsTabView} from './ProjectsTabView.js';
import CProjectChangeWindow from './ChangeWindow/CProjectChangeWindow.js';

export default class ProjectsTab {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
        this.projectWindow;
    }

    init() { 

    }

    config() {
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
                this.projectWindow = $$('projectChangeWindow');
                this.projectWindow.attachEvent('onDestruct', () => {
                    this.refreshTable();
                })

            })
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