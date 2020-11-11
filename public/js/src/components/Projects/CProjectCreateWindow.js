import getProjectCreateWindow from './ProjectCreateWindow.js';
import projectModel from '../../models/projectModel.js';
import {Project} from '../../models/entities/project.js';

export default class CProjectCreateWindow {
    constructor() {
        this.view;
    }

    init() { 
    }

    config(teamLeadsIDFIO) {
        return webix.ui(getProjectCreateWindow(teamLeadsIDFIO));
    }

    attachEvents() {

        this.view = {
            window : $$("addProjectWindow"),
            windowConfirmButton : $$("addProjectConfirmButton"),
            windowCancelButton : $$("addProjectCancelButton"),
            form : $$("addProjectForm"),
        };

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal();
            
            if(this.validation(val)) {               

                let project = new Project(0, val.addProjectName, val.addProjectDescription, val.addProjectTeamLead, []);
                projectModel.createProject(project).then((result) => {
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

    validation(project) {
        let name = project.addProjectName;
        let descr = project.addProjectDescriptionn;
        
        if (name == '') {
            webix.message({type:"error", text:"Укажите название проекта!"});
        } else {
            if (descr == '') {
                webix.message({type:"error", text:"Заполните описание проекта!"});
            } else {
                return true;
            }
        }

        return false;
    }
}