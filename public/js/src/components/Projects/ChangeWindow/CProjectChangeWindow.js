import getChangeProjectWindow from './ProjectChangeWindow.js';
import projectModel from '../../../models/projectModel.js';
import employeeModel from '../../../models/employeeModel.js';
import taskModel from '../../../models/taskModel.js';

//Компонент окна редактора проекта
export default class CProjectChangeWindow {
    constructor() {
        this.view;
        this.currentEmployee;
    }

    //Инициализация компонента
    init(currentEmployee) { 
        this.currentEmployee = currentEmployee;
    }

    //Возвращение вебикс конфигурации компонента
    config(project, teamLeads) {
        return getChangeProjectWindow(project, this.currentEmployee, teamLeads);
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            window : $$("projectChangeWindow"),
            windowConfirmButton : $$("changeProjectButtonConfirm"),
            windowCancelButton : $$("changeProjectButtonCancel"),
            windowRemoveButton: $$('changeProjectButtonRemove'),
            form : $$("projectChangeForm"),
        };

        //Событие удаления проекта
        this.view.windowRemoveButton.attachEvent('onItemClick', () => {

            let val = this.view.form.getValues();
            projectModel.removeProject(Number(val.projectChangeId)).then((res) => {
                taskModel.deleteAllProjectTasks(Number(val.projectChangeId)).then((result) => {
                    this.view.form.clear();
                    this.view.window.close();
                })
            })
            
        })

        //Событие изменения проекта
        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.view.form.getValues();
            
            projectModel.getProjectById(Number(val.projectChangeId)).then((resProject) => {
                resProject.description = val.projectChangeDescription;
                employeeModel.getEmployeeById(Number(val.projectChangeTeamLead)).then((teamLead) => {
                    resProject.teamLead = teamLead;
                    if (this.validateProject(resProject)) {
                        projectModel.updateProject(resProject).then((res) => {
                            this.view.form.clear();
                            this.view.window.close()
                        })
                    }
                })
            })
            
        })

        //Закрытие окна
        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

    //Валидация данных в форме
    validateProject(project) {
        if (project.description == '') {
            webix.message({type:"error", text:"Заполните описание!"});
            return false;
        }

        return true;
    }

}