import authModel from '../../models/authModel.js';
import employeeModel from '../../models/employeeModel.js';
import taskModel from '../../models/taskModel.js';
import getEmployeeChangeWindow from './EmployeeChangeWindow.js';
import projectModel from '../../models/projectModel.js';

export default class CEmployeeChangeWindow {
    constructor() {
        this.view;
    }

    init() { 
    }

    config(employee, positions) {
        return webix.ui(getEmployeeChangeWindow(employee, positions));
    }

    attachEvents() {

        this.view = {
            window : $$("employeeChangeWindow"),
            windowConfirmButton : $$("employeeChangeConfirmButton"),
            windowCancelButton : $$("employeeChangeCancelButton"),
            windowRemoveButton: $$("employeeChangeRemoveButton"),
            windowRestoreButton: $$("employeeChangeRestoreButton"),
            form : $$("employeeChangeForm"),
        };

        this.view.windowRestoreButton.attachEvent('onItemClick', () => {
            let id = Number(this.getVal().employeeChangeId);
            employeeModel.restoreEmployee(id).then((result) => {
                authModel.restoreUser(id).then((res) => {
                    this.view.form.clear();
                    this.view.window.close();
                })
            })
        })

        this.view.windowRemoveButton.attachEvent('onItemClick', () => {
            let id = Number(this.getVal().employeeChangeId);
            employeeModel.removeEmployee(id).then((result) => {
                authModel.removeUser(id).then((res) => {
                    this.view.form.clear();
                    this.view.window.close();
                })
            })
        })

        this.view.windowConfirmButton.attachEvent('onItemClick', () => {

            let newValue = this.getVal();
            
            if(this.validation(newValue)) {               
                employeeModel.getEmployeeById(Number(newValue.employeeChangeId)).then((resultEmpl) => {
                    resultEmpl.firstName = newValue.employeeChangeFirstName;
                    resultEmpl.lastName = newValue.employeeChangeLastName;
                    resultEmpl.patronymic = newValue.employeeChangePatronymic;
                    resultEmpl.position = newValue.employeeChangePosition;
                    resultEmpl.phone = newValue.employeeChangePhone;
                    resultEmpl.email = newValue.employeeChangeEmail;
                    employeeModel.updateEmployee(resultEmpl).then((result) => {
                        authModel.getUserById(result.id).then((resultUser) => {
                            resultUser.email = newValue.employeeChangeEmail;
                            authModel.updateUser(resultUser).then((res) => {
                                taskModel.updateTasksEmployee(result).then((val) => {
                                    projectModel.updateProjectsByEmployee(result).then((value) => {
                                        this.view.form.clear();
                                        this.view.window.close();
                                    })
                                })
                            })
                        })
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
        let firstName = employee.employeeChangeFirstName;
        let lastName = employee.employeeChangeLastName;
        let patronymic = employee.employeeChangePatronymic;
        let email = employee.employeeChangeEmail;
        let phone = employee.employeeChangePhone;
        
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
        } else if (patronymic != '' && patronymic.length <= 5) {
            webix.message({type:"error", text:"Укажите корректное отчество"});
            return false;
        }

        return true;       

    }
}