//Возвращает и показывает форму редактирования проекта
export default function getChangeProjectWindow(project, currentEmployee, teamLeadsIdFIO) {
    if ((currentEmployee.id + ' ' + currentEmployee.lastName + ' ' + currentEmployee.firstName + ' ' + currentEmployee.patronymic) == project.teamLeadIdFIO) {
        conBtn.hidden = false;
        remBtn.hidden = false;
    }

    let cells = [conBtn, remBtn, cancelBtn];

    return {
        view:"window",
        id:"projectChangeWindow",
        head:"Проект" + project.name,
        modal:true,
        position:"center",
        body:{
            view:"form", 
            id:"projectChangeForm",
            width:600,
            elements:[
                { view:"text", label:"ID", name:"projectChangeId", value:project.id, labelWidth:120, readonly:true},
                { view:"textarea", label:"Описание", name:"projectChangeDescription", value:project.description, height: 120, labelWidth:120},
                { view:"select", label:"teamLead", name:"projectChangeTeamLead", options:teamLeadsIdFIO, value:project.teamLeadIdFIO, labelWidth:120},
                { margin:5, cols:cells}
            ], 
            elementsConfig:{
                bottomPadding: 18,
              }
        }
    }

}

let conBtn = { view:"button", id:"changeProjectButtonConfirm", value:"Изменить" , css:"webix_primary", hidden: true};
let remBtn = { view:"button", id:"changeProjectButtonRemove", value:"Удалить" , css:"webix_primary", hidden: true};
let cancelBtn = { view:"button", id:"changeProjectButtonCancel", value:"Отменить" , css:"webix_primary"};