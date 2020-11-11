// возвращает webix конфигурацию таблицы сотрудников
export default function getEmployeesTabView() {
    return (
		{id: 'employeesTable', header: 'Сотрудники', view:'datatable', columns:cells,
        data:[]});
}

let cells = [
    { id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
    { id:"userId", header:["UserID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
    { id:"firstName", header:["Имя", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
    { id:"lastName", header:["Фамилия", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
    { id:"patronymic", header:["Отчество", {content:"textFilter"}], editor:"text", css:"rank", sort:"string", fillspace:true},
    { id:"position", header:["Должность", {content:"selectFilter"}], css:"rank", sort:"string", fillspace:true},
    { id:"phone", header:["Телефон", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
    { id:"email", header:["E-mail", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true}];