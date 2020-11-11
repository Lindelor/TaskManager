//Возвращает и показывает форму регистрации
export default function getRegisterWindow(positions) {
	return{
		view:"window",
		id:"registerWindow",
		head:"Регистрация",
		modal:true,
		position:"center",
		body:{
			view:"form", 
			id:"registerForm",
			width:400,
			elements:[
				{ view:"text", label:"E-mail", name:"registerEmail"},
				{ view:"text", label:"Фамилия", name:"registerLastName"},
				{ view:"text", label:"Имя", name:"registerName"},
				{ view:"text", label:"Отчество", name:"registerPatronymic"},
				{ view:"text", label:"Телефон", name:"registerPhone"},
				{ view:"select", options:positions, name:"registerPosition"},
				{ view:"text", type:"password", label:"Пароль", name:"registerPassword"},
				{ margin:5, cols:[
					{ view:"button", id:"registerFormConfirm", value:"Зарегистрировать" , css:"webix_primary"},
					{ view:"button", id:"registerFormCancel", value:"Отменить" , css:"webix_primary"},
				]}
			], 
			elementsConfig:{
				bottomPadding: 18,

			}
		}
	}
}