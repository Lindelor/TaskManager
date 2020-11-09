// Employee класс для представления сущности сотрудника
export class Employee {
	constructor (id, firstName, lastName, patronymic, position, phone, userId, email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.patronymic = patronymic;
		this.position = position;
		this.phone = phone;
		this.userId = userId;
		this.email = email;
		this.isRemoved = false;
	}
}

//Сущность Должности сотрудника.
export let POSITION = {
	manager: "Менеджер", 
	proger:"Программист", 
	senior:"Старший программист", 
	teamLead:"Тимлид",
}