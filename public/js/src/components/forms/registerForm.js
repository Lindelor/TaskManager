import authModel from '../../models/authModel.js';
import employeeModel from '../../models/employeeModel.js';
import { Employee } from '../../models/entities/employee.js';
import {User} from '../../models/entities/user.js';

//Возвращает и показывает форму регистрации
export default function getRegisterForm() {
	return (
		webix.ui({
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
				{ view:"text", label:"E-mail", name:"registerEmail", invalidMessage:"Укажите корректный E-mail"},
				{ view:"text", label:"Фамилия", name:"registerLastName", invalidMessage:"Поле не должно быть пустым"},
				{ view:"text", label:"Имя", name:"registerName", invalidMessage:"Поле не должно быть пустым"},
				{ view:"text", label:"Отчество", name:"registerPatronymic"},
				{ view:"text", label:"Телефон", name:"registerPhone", invalidMessage:"Поле не должно быть пустым"},
				{ view:"select", options:employeeModel.getPositions(), name:"registerPosition"},
				{ view:"text", type:"password", label:"Пароль", name:"registerPassword", invalidMessage:"Поле не должно быть пустым"},
				{ margin:5, cols:[
					{ view:"button", value:"Зарегистрировать" , css:"webix_primary", click:saveChange},
					{ view:"button", value:"Отменить" , css:"webix_primary", click:discard},
				]}
            ], 
            rules:{
                "registerEmail":webix.rules.isEmail,
                "registerLastName":webix.rules.isNotEmpty,
                "registerName":webix.rules.isNotEmpty,
                "registerPhone":webix.rules.isNotEmpty,
                "registerPassword":webix.rules.isNotEmpty,
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

let saveChange = function() {
    let newValue = $$("registerForm").getValues();
    if ($$("registerForm").validate()) {
        let employee = new Employee(0, newValue.registerName, newValue.registerLastName, newValue.registerPatronymic, newValue.registerPosition, newValue.registerPhone, 0);
        employeeModel.createEmployee(employee).then((id) => {
            let user = new User(id.id, newValue.registerEmail, newValue.registerPassword);
            authModel.createUser(user);
            $$("registerWindow").close();
        })
                
    }
};

let discard = function() {
	$$("registerWindow").close();
}