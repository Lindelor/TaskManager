import projectModel from '../../models/projectModel.js';
import {Project} from '../../models/entities/project.js';

//Возвращает и показывает форму создания проекта
export default function getProjectForm() {
	return (
		webix.ui({
		view:"window",
		id:"addProjectWindow",
		head:"Создать проект",
		modal:true,
		position:"center",
		body:{
			view:"form", 
			id:"addProjectForm",
			width:400,
			elements:[
				{ view:"text", label:"Название", name:"addProjectName", invalidMessage:"Поле не должно быть пустым"},
				{ view:"text", label:"Описание", name:"addProjectDescription", invalidMessage:"Поле не должно быть пустым"},
				{ margin:5, cols:[
					{ view:"button", value:"Создать" , css:"webix_primary", click:saveProject},
					{ view:"button", value:"Отменить" , css:"webix_primary", click:discard},
				]}
            ], 
            rules:{
                "addProjectName":webix.rules.isNotEmpty,
                "addProjectDescription":webix.rules.isNotEmpty,
            },
            elementsConfig:{
                bottomPadding: 18,
                on:{
                  "onChange":function(){
                    this.validate();
                  }
                }
              }
		}
		}).show()
)
}

let saveProject = function() {
    let newValue = $$("addProjectForm").getValues();
    if ($$("addProjectForm").validate()) {
        let project = new Project(0, newValue.addProjectName, newValue.addProjectDescription);
        projectModel.createProject(project).then((val) => {
            $$("addProjectWindow").close();
        });
                
    }
};

let discard = function() {
	$$("addProjectWindow").close();
}