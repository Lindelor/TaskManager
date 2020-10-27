//Task - класс для представления сущности задачи.
export class Task {
    constructor(id, name, description, projectName, projectId, estimated, end, status, employee, urgency) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.projectName = projectName;
		this.projectId = projectId;
		this.estimated = estimated;
		this.end = end;
		this.status = status;
		this.employee = employee;
		this.urgency = urgency;
    }
}

//Статусы тасков
export let TASK_STATUS = {
    fresh: 'Новая',
    haveEmployee: 'Назначена',
	inProgress: 'В работе',
	done: 'Завершена',
	reconciliation: 'На согласовании',
}

//Срочности
export let URGENCY = {
	ASAP: "АСАП",
	Low: "Не срочно",
	NVM: "Подождет",
}