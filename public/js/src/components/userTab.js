//Возвращает вкладку с информацией о юзере, требует юзера.
export function getUserTab(employee, user) {
	return {id: 'userTab', 
	header: "Пользователь", 
	cols:[
		  { id:"t1", width:450},
		  { id:"userCol", rows:[
				{height:80},
				{template:"Email: " + user.email, type:"header"},
				{template:"ФИО: " + employee.lastName + " " + employee.firstName + " " + employee.patronymic, type:"header"},
				{template:"Должность: " + employee.position, type:"header"},
				{template:"Телефон: " + employee.phone, type:"header"},		
				{height:80}
		  ]},
		  { id:"t2", width:450},
	]
	}
}