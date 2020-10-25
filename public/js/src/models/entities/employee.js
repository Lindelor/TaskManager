// Employee класс для представления сущности сотрудника
export class Employee {
	constructor (id, firstName, lastName, patronymic, position, phone, userId) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.patronymic = patronymic;
		this.position = position;
		this.phone = phone;
		this.userId = userId;
	}
}

//Сущность Должности сотрудника.
export let POSITION = {
	manager: "Менеджер", 
	proger:"Программист", 
	senior:"Старший программист", 
	teamLead:"Тимлид",
}