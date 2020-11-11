export default function getMainTab(employee, cells) {
	return {
		rows: [

			{
				cols: [
					{view: 'button', id: 'addTask', value:"Создать задачу", width:200, hidden:false},
					{view: 'button', id: 'addProject', value:"Создать проект", width:200, hidden:true},
					{view: 'button', id: 'registerUser', value:"Зарегистрировать", hidden:true, width:200},
					{id: 'spaceFiller', fillspace:true},
					{view: 'button', id: 'userButton', value:employee.email, width:150 },
					{view: 'button', id: 'logoutButton', value:'Выйти', width:150},
				],
			},
			{view:"tabview", id:"mainView", multiview:true, cells: cells}
		],
	}
}