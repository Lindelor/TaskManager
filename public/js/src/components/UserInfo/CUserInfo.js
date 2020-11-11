import getInfoWindow from './UserInfoView.js';

export default class CUserInfo {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
    }

    init() { 
    }

    config() {
        return webix.ui(getInfoWindow(this.currentEmployee));
    }

    attachEvents() {

        this.view = {
            window : $$("infoWindow"),
            windowCancelButton : $$("infoFormClose"),
            form : $$("infoForm"),
        };

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

}