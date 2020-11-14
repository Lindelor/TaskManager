//Task - класс для представления сущности задачи.
export class Task {
    constructor(id, name, description, projectName, projectId, estimated, end, status, employee, urgency) {
		this.id = id; //id
		this.name = name; // название
		this.description = description; // описание
		this.projectName = projectName; // имя проекта
		this.projectId = projectId; // id проекта
		this.estimated = estimated; // планируемое время
		this.end = end; // фактическое время
		this.status = status; // статус
		this.employee = employee; // сотрудник
		this.urgency = urgency; // срочность
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