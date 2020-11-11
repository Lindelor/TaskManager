//Возвращает и показывает окно с данными сотрудника
export default function getInfoWindow(currentEmployee) {
	return{
		view:"window",
		id:"infoWindow",
		head:"Профиль",
		modal:true,
		position:"center",
		body:{
			view:"form", 
			id:"infoForm",
			width:400,
			elements:[
                { view:"text", label:"E-mail", name:"userEmail", value:currentEmployee.email, readonly:true},
                { view:"text", label:"Телефон", name:"userPhone", value:currentEmployee.phone, readonly:true},
				{ view:"text", label:"Фамилия", name:"userLastName", value:currentEmployee.lastName, readonly:true},
				{ view:"text", label:"Имя", name:"userFirstName", value:currentEmployee.firstName, readonly:true},
				{ view:"text", label:"Отчество", name:"userPatronymic", value:currentEmployee.patronymic, readonly:true},
				{ view:"text", label:"Должность", name:"userPosition", value:currentEmployee.position, readonly:true},
				{ margin:5, cols:[
					{ view:"button", id:"infoFormClose", value:"Закрыть" , css:"webix_primary"},
				]}
			], 
			elementsConfig:{
				bottomPadding: 18,
			}
		}
	}
}