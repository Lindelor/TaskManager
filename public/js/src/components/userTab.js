//Возвращает вкладку с информацией о юзере, требует юзера.
export function getUserTab(user) {
	return {id: 'userTab', 
	header: "Пользователь", 
	cols:[
		  { id:"t1", width:450},
		  { id:"userCol", rows:[
				{height:80},
				{template:"Имя пользователя: " + user.userName, type:"header"},
				{template:"ФИО: " + user.lastName + " " + user.firstName + " " + user.patronymic, type:"header"},
				{template:"Должность: " + user.position, type:"header"},
				{template:"E-Mail: " + user.email, type:"header"},
				{template:"Телефон: " + user.phone, type:"header"},		
				{height:80}
		  ]},
		  { id:"t2", width:450},
	]
	}
}