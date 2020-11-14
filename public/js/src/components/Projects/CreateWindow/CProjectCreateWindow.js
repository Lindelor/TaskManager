import getProjectCreateWindow from './ProjectCreateWindow.js';
import projectModel from '../../../models/projectModel.js';
import {Project} from '../../../models/entities/project.js';
import employeeModel from '../../../models/employeeModel.js';

//Компонент окна создания проекта
export default class CProjectCreateWindow {
    constructor() {
        this.view;
    }

    //Инициализация компонента
    init() { 
    }

    //Возвращение вебикс конфигурации компонента
    config(teamLeads) {
        return webix.ui(getProjectCreateWindow(teamLeads));
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            window : $$("addProjectWindow"),
            windowConfirmButton : $$("addProjectConfirmButton"),
            windowCancelButton : $$("addProjectCancelButton"),
            form : $$("addProjectForm"),
        };

        //Событие создания проекта
        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let val = this.view.form.getValues();
            
            if(this.validation(val)) {               
                employeeModel.getEmployeeById(Number(val.addProjectTeamLead)).then((teamLead) => {
                    let project = new Project(0, val.addProjectName, val.addProjectDescription, teamLead, []);
                    projectModel.createProject(project).then((result) => {
                        this.view.form.clear();
                        this.view.window.close();
                    })
                })
            }            
        })

        //Закрытие окна
        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

    //Валидация данных
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