//Функция возвращает webix конфигурацию окна информации сотрудника
export default function getEmployeeChangeWindow(employee, positions) {

    let buttons = [{ view:"button", id:"employeeChangeConfirmButton", value:"Изменить" , css:"webix_primary"},
    { view:"button", id:"employeeChangeRemoveButton", value:"Уволить" , css:"webix_primary", hidden:true},
    { view:"button", id:"employeeChangeRestoreButton", value:"Восстановить" , css:"webix_primary", hidden:true},
    { view:"button", id:"employeeChangeCancelButton", value:"Отменить" , css:"webix_primary"}];

    if (employee.isRemoved == false) {
        buttons[1].hidden = false;
    } else {
        buttons[2].hidden = false;
    }

    return {
        view:"window",
        id:"employeeChangeWindow",
        head:"Информация о сотруднике",
        modal:true,
        position:"center",
        body:{
            view:"form", 
            id:"employeeChangeForm",
            width:900,
            elements:[
                { view:"text", label:"ID", name:"employeeChangeId", value:employee.id, labelWidth:120, readonly:true},
                { view:"text", label:"Имя", name:"employeeChangeFirstName", value:employee.firstName, labelWidth:120},
                { view:"text", label:"Фамилия", name:"employeeChangeLastName", value:employee.lastName, labelWidth:120},
                { view:"text", label:"Отчество", name:"employeeChangePatronymic", value:employee.patronymic, labelWidth:120},
                { view:"select", label:"Должность", options:positions, name:"employeeChangePosition", value:employee.position, labelWidth:120},
                { view:"text", label:"Телефон", name:"employeeChangePhone", value:employee.phone, labelWidth:120},
                { view:"text", label:"E-mail", name:"employeeChangeEmail", value:employee.email, labelWidth:120},
                { margin:5, cols:buttons}
            ], 
            elementsConfig:{
                bottomPadding: 18,
              }
        }
    };
}