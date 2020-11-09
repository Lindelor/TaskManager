import authModel from '../../models/authModel.js';
import employeeModel from '../../models/employeeModel.js';
import { Employee } from '../../models/entities/employee.js';
import {User} from '../../models/entities/user.js';
import getRegisterWindow from './RegisterUserWindow.js';

export default class CRegisterUserWindow {
    constructor() {
        this.view;
    }

    init() { 
    }

    config(positions) {
        return webix.ui(getRegisterWindow(positions));
    }

    attachEvents() {

        this.view = {
            window : $$("registerWindow"),
            windowConfirmButton : $$("registerFormConfirm"),
            windowCancelButton : $$("registerFormCancel"),
            form : $$("registerForm"),
        };

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let newValue = this.getVal();
            
            if(this.validation(newValue)) {               

                let employee = new Employee(0, newValue.registerName, newValue.registerLastName, newValue.registerPatronymic, newValue.registerPosition, newValue.registerPhone, 0, newValue.registerEmail);
                employeeModel.createEmployee(employee).then((id) => {
                    let user = new User(id.id, newValue.registerEmail, newValue.registerPassword);
                    authModel.createUser(user).then((result) => {
                        this.view.form.clear();
                        this.view.window.close();
                        this.refreshTable();
                    })
                })
            }            
        })

        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

    getVal() {
        return this.view.form.getValues();
    }

    validation(employee) {
        let firstName = employee.registerName;
        let lastName = employee.registerLastName;
        let patronymic = employee.registerPatronymic;
        let email = employee.registerEmail;
        let phone = employee.registerPhone;
        let password = employee.registerPassword;
        
        if (firstName == '') {
            webix.message({type:"error", text:"Укажите Имя"});
            return false;
        } else if (lastName == '') {
            webix.message({type:"error", text:"Укажите Фамилию"});
            return false;
        } else if (!webix.rules.isEmail(email)) {
            webix.message({type:"error", text:"Укажите корректный E-mail"});
            return false;
        } else if (phone.length <= 5 || !webix.rules.isNumber(phone)) {
            webix.message({type:"error", text:"Укажите корректный телефон"});
            return false;
        } else if (password.length <= 5) {
            webix.message({type:"error", text:"Длинна пароля должна быть 6+ символов"});
            return false;
        } else if (patronymic != '' && patronymic.length <= 5) {
            webix.message({type:"error", text:"Укажите корректное отчество"});
            return false;
        }

        return true;       

    }

    refreshTable() {

        employeeModel.getEmployees().then((result) => {
            $$('employeesTable').clearAll();
            $$('employeesTable').parse(result);
            $$('employeesTable').refreshFilter();
        })

    }
}