import getChangeProjectWindow from './ProjectChangeWindow.js';
import projectModel from '../../../models/projectModel.js';

//Компонент окна редактора проекта
export default class CProjectChangeWindow {
    constructor() {
        this.view;
        this.currentEmployee;
    }

    //Инициализация компонента
    init() { 
    }

    //Возвращение вебикс конфигурации компонента
    config(project, currentEmployee, teamLeadsIdFIO) {
        this.currentEmployee = currentEmployee;
        return webix.ui(getChangeProjectWindow(project, currentEmployee, teamLeadsIdFIO));
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

            let val = this.getVal();
            projectModel.removeProject(Number(val.projectChangeId)).then((res) => {
                this.view.form.clear();
                this.view.window.close();
            })
            
        })

        //Событие изменения проекта
        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.getVal();
            
            projectModel.getProjectById(Number(val.projectChangeId)).then((resProject) => {
                resProject.description = val.projectChangeDescription;
                resProject.teamLeadsIdFIO = val.projectChangeTeamLead;

                if (this.validateProject(resProject)) {
                    projectModel.updateProject(resProject).then((res) => {
                        this.view.form.clear();
                        this.view.window.close()
                    })
                }
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

    //Получение данных из формы
    getVal() {
        return this.view.form.getValues();
    }

}