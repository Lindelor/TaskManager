// Employee класс для представления сущности сотрудника
export class Employee {
	constructor (id, firstName, lastName, patronymic, position, phone, userId, email) {
		this.id = id; // id
		this.firstName = firstName; // имя
		this.lastName = lastName; // фамилия
		this.patronymic = patronymic; // отчество
		this.position = position; // должность
		this.phone = phone; // телефон
		this.userId = userId; // userId (для связи с сущностью пользователя)
		this.email = email; // email
		this.isRemoved = false; // флаг увольнения сотрудника (true == уволен, false == работает)
	}
}

//Сущность Должности сотрудника.
export let POSITION = {
	manager: "Менеджер", 
	proger:"Программист", 
	senior:"Старший программист", 
	teamLead:"Тимлид",
}