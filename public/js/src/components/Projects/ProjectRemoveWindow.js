import projectModel from '../../models/projectModel.js';

//Возвращает и показывает форму удаления проекта
export default function getRemoveProjectWindow() {
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
                        { view:"button", id:"removeProjectButtonConfirm", value:"Удалить" , css:"webix_primary"},
                        { view:"button", id:"removeProjectButtonCancel", value:"Отменить" , css:"webix_primary"},
                    ]}
                ], 
                elementsConfig:{
                    bottomPadding: 18,
                  }
            }
            })
        )
    })

}