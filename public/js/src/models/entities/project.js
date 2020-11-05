// Project класс для представления сущности проекта
export class Project {
	constructor (id, name, description, teamLeadIdFIO) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.teamLeadIdFIO = teamLeadIdFIO;
		this.employees = [];
	}
}