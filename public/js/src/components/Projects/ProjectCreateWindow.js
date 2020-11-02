//Возвращает и показывает форму создания проекта
export default function getProjectCreateWindow() {
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
			width:700,
			elements:[
				{ view:"text", label:"Название", name:"addProjectName"},
				{ view:"textarea", label:"Описание", name:"addProjectDescription", height: 150},
				{ margin:5, cols:[
					{ view:"button", id:"addProjectConfirmButton", value:"Создать" , css:"webix_primary"},
					{ view:"button", id:"addProjectCancelButton", value:"Отменить" , css:"webix_primary"},
				]}
            ], 
            elementsConfig:{
                bottomPadding: 18,
              }
		}
		})
)
}