import getChangeProjectWindow from './ProjectChangeWindow.js';
import projectModel from '../../models/projectModel.js';
import {POSITION} from '../../models/entities/employee.js';

export default class CProjectChangeWindow {
    constructor() {
        this.view;
        this.currentEmployee;
    }

    init() { 
    }

    config(project, currentEmployee, teamLeadsIdFIO) {
        this.currentEmployee = currentEmployee;
        return webix.ui(getChangeProjectWindow(project, currentEmployee, teamLeadsIdFIO));
    }

    attachEvents() {

        this.view = {
            window : $$("projectChangeWindow"),
            windowConfirmButton : $$("changeProjectButtonConfirm"),
            windowCancelButton : $$("changeProjectButtonCancel"),
            windowRemoveButton: $$('changeProjectButtonRemove'),
            form : $$("projectChangeForm"),
        };

        this.view.windowRemoveButton.attachEvent('onItemClick', () => {

            let val = this.getVal();
            projectModel.removeProject(Number(val.projectChangeId)).then((res) => {
                this.refreshTable();
                this.view.form.clear();
                this.view.window.close();
            })
            
        })

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal();
            
            projectModel.getProjectById(Number(val.projectChangeId)).then((resProject) => {
                resProject.description = val.projectChangeDescription;
                resProject.teamLeadsIdFIO = val.projectChangeTeamLead;

                if (this.validateProject(resProject)) {
                    projectModel.updateProject(resProject).then((res) => {
                        this.refreshTable();
                        this.view.form.clear();
                        this.view.window.close()
                    })
                }
            })
            
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

    validateProject(project) {
        if (project.description == '') {
            webix.message({type:"error", text:"Заполните описание!"});
            return false;
        }

        return true;
    }

    getVal() {
        return this.view.form.getValues();
    }

    refreshTable() {

        projectModel.getProjects().then((result) => {
            $$('projectsTable').clearAll();
            $$('projectsTable').parse(result);
            $$('projectsTable').refreshFilter();
        })

    }

}