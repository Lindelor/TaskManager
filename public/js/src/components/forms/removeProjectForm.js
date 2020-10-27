import projectModel from '../../models/projectModel.js';
import {refreshTables} from '../projectsTab.js';

//Возвращает и показывает форму удаления проекта
export default function getRemoveProjectForm() {
    projectModel.getProjectsNames().then((result) => {
        return (
            webix.ui({
            view:"window",
            id:"removeProjectWindow",
            head:"Удалить проект",
            modal:true,
            position:"center",
            body:{
                view:"form", 
                id:"removeProjectForm",
                width:400,
                elements:[
                    { view:"select", options:result, name:"removeProjectName"},
                    { margin:5, cols:[
                        { view:"button", value:"Удалить" , css:"webix_primary", click:deleteProject},
                        { view:"button", value:"Отменить" , css:"webix_primary", click:discard},
                    ]}
                ], 
                elementsConfig:{
                    bottomPadding: 18,
                  }
            }
            }).show()
        )
    })

}

let deleteProject = function() {
    let projectName = $$("removeProjectForm").getValues().removeProjectName;
    projectModel.getProjectByName(projectName).then((result) => {
        projectModel.removeProject(result.id);
        $$("removeProjectWindow").close();
        refreshTables();
    })

};

let discard = function() {
	$$("removeProjectWindow").close();
}