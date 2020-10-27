import taskModel from '../../models/taskModel.js';
import {Task, TASK_STATUS} from '../../models/entities/task.js';
import projectModel from '../../models/projectModel.js';

//Возвращает и показывает форму создания задачи
export default function getTaskForm() {
    projectModel.getProjectsNames().then((names) => {
        taskModel.getTaskUrgencies().then((urgencies) => {
            return (
                webix.ui({
                view:"window",
                id:"addTaskWindow",
                head:"Добавить задачу",
                modal:true,
                position:"center",
                body:{
                    view:"form", 
                    id:"addTaskForm",
                    width:400,
                    elements:[
                        { view:"text", label:"Название", name:"addTaskName", invalidMessage:"Поле не должно быть пустым"},
                        { view:"text", label:"Описание", name:"addTaskDescription", invalidMessage:"Поле не должно быть пустым"},
                        { view:"select", options:urgencies, label:"Срочность", name:"addTaskUrgency"},
                        { view:"select", options:names, label:"Проект", name:"addTaskProject"},
                        { margin:5, cols:[
                            { view:"button", value:"Создать" , css:"webix_primary", click:saveChange},
                            { view:"button", value:"Отменить" , css:"webix_primary", click:discard},
                        ]}
                    ],
                    rules:{
                        "addTaskName":webix.rules.isNotEmpty,
                        "addTaskDescription":webix.rules.isNotEmpty,
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
        })
    })
}

let saveChange = function () {
    let newValue = $$("addTaskForm").getValues();
    if ($$("addTaskForm").validate()) {
        projectModel.getProjectByName(newValue.addTaskProject).then((finalProject) => {
            let task = new Task(0, newValue.addTaskName, newValue.addTaskDescription, finalProject.id, '', '', TASK_STATUS.fresh, '', newValue.addTaskUrgency);
            taskModel.createTask(task);
            $$("addTaskWindow").close();
        })
    }
};

let discard = function() {
    $$("addTaskForm").clear();
	$$("addTaskWindow").close();
}