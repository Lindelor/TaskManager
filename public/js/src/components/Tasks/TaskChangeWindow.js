export default function getChangeTaskWindowView(task, names, employees, statuses, urgencies) {
    return (
        webix.ui({
            view:"window",
            id:"taskChangeWindow",
            head:"Задача " + task.name,
            modal:true,
            position:"center",
            width:1000,
            body:{
                id:"taskChangeForm",
                view:"form", 
                elements:getElems(task, names, employees, statuses, urgencies),
            }
            })
    )
}
function getElems(task, names, employees, statuses, urgencies) {
    let columns = [
        { view:"button", id:"taskConfirmButton", value:"Изменить" , css:"webix_primary"},
        { view:"button", id:"taskReconButton", value:"На согласование" , css:"webix_primary"},
        { view:"button", id:"taskRemoveButton", value:"Удалить" , css:"webix_primary"},
        { view:"button", id:"taskCancelButton", value:"Отменить" , css:"webix_primary"},
    ];

    let elems = [{ view:"text", label:"ID", name:"taskChangeId", value:task.id, labelWidth:120},
        { view:"textarea", label:"Описание", name:"taskChangeDescription", value:task.description, height: 120, labelWidth:120},
        { view:"select", label:"Проект", options:names, name:"taskChangeProjectName", value:task.projectName, labelWidth:120},
        { view:"select", label:"Сотрудник", options:employees, name:"taskChangeEmployee", value:task.employee, labelWidth:120},
        { view:"select", label:"Статус", options:statuses, name:"taskChangeStatus", labelWidth:120, value:task.status},
        { view:"select", label:"Срочность", options:urgencies, name:"taskChangeUrgency", labelWidth:120, value: task.urgency},
        { view:"text", label:"Ожид. Время", name:"taskChangeEstimated", value:task.estimated, labelWidth:120},
        { view:"text", label:"Факт. Время", name:"taskChangeFact", value:task.end, labelWidth:120},
        { margin:5, cols: columns}];

    return elems;
}