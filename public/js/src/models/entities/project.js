// Project класс для представления сущности проекта
export class Project {
	constructor (id, name, description, teamLead, employees) {
		this.id = id; // id
		this.name = name; // название
		this.description = description; // описание
		this.teamLead = teamLead; // тимлид
		this.employees = employees; // сотрудники
	}
}