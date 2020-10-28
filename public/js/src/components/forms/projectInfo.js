//Возвращает и показывает окно с информацией о проекте
export default function getInfoWindow(project) {
	return (
		webix.ui({
		view:"window",
		id:"projectInfoWindow",
		head:"Информация о проекте",
		modal:true,
		position:"center",
		body:{
			view:"form", 
			id:"projectInfoForm",
			width:1000,
			elements:[
                { view:"textarea", label:"ID", name:"projectInfoId", value:project.id, readonly:true},
				{ view:"textarea", label:"Название", name:"projectInfoName", value:project.name, height: 100, readonly:true},
				{ view:"textarea", label:"Описание", name:"projectInfoDescription", value:project.description, height: 200, readonly:true},
				{ margin:5, cols:[
					{ view:"button", value:"Закрыть" , css:"webix_primary", click:discard},
				]}
            ], 
            elementsConfig:{
                bottomPadding: 18,
              }
		}
		}).show()
    )
}

let discard = function() {
	$$("projectInfoWindow").close();
}