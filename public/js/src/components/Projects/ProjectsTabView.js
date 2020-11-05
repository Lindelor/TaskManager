//Функция возвращает конфигурацию таба проектов
export function getProjectsTabView() {

    return {
        id: 'projectsTable', 
        header: 'Проекты', 
        view:'datatable', 
        columns:[
            { id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
            { id:"name", header:["Название", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
            { id:"description", header:["Описание", {content:"textFilter"}], css:"rank", sort:"int", fillspace:true},
            { id:"teamLeadIdFIO", header:["ТимЛид", {content:"textFilter"}], css:"rank", sort:"string", width:200}
        ],
        data:[], 
    }

}