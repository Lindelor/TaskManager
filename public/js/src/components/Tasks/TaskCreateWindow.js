//Возвращает и показывает форму создания задачи
export default function getCreateTaskWindowView(projectsNames, urgencies) {
    return {
        view: "window",
        id: "addTaskWindow",
        head: "Добавить задачу",
        modal: true,
        position: "center",
        body: {
            view: "form",
            id: "addTaskForm",
            width: 700,
            elements: [
                { view: "text", label: "Название", name: "addTaskName" },
                { view: "textarea", label: "Описание", name: "addTaskDescription", height: 150 },
                { view: "select", options: urgencies, label: "Срочность", name: "addTaskUrgency" },
                { view: "select", options: projectsNames, label: "Проект", name: "addTaskProject" },
                {
                    margin: 5, cols: [
                        { view: "button", id: "CreateTaskButton", value: "Создать", css: "webix_primary" },
                        { view: "button", id: "CancelTaskButton", value: "Отменить", css: "webix_primary" },
                    ]
                }
            ],
            elementsConfig: {
                bottomPadding: 18,
            }
        }
    }


}