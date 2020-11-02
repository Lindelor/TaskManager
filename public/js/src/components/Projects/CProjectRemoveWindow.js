import getRemoveProjectWindow from './ProjectRemoveWindow.js';
import projectModel from '../../models/projectModel.js';

export default class CProjectRemoveWindow {
    constructor() {
        this.view;
    }

    init() { 
    }

    config() {
        return this.getRemoveProjectWindow();
    }

    attachEvents() {

        this.view = {
            window : $$("removeProjectWindow"),
            windowConfirmButton : $$("removeProjectButtonConfirm"),
            windowCancelButton : $$("removeProjectButtonCancel"),
            form : $$("removeProjectForm"),
        };

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal();
            projectModel.removeProject(val.removeProjectName);
            this.view.form.clear();
            this.view.window.hide();
            
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.hide();
        })
    }

    getVal() {
        return this.view.form.getValues();
    }

}