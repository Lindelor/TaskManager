import projectModel from '../models/projectModel.js';
import getInfoWindow from '../components/forms/projectInfo.js';

export function getInfoTab(infoData) {

    return (
        {id: 'infoTab', header: 'Проекты', view:'datatable', columns:[
        { id:"id", header:["ID", {content:"textFilter"}], css:"rank", sort:"int", width:70},
        { id:"name", header:["Название", {content:"textFilter"}], css:"rank", sort:"string", fillspace:true},
        { id:"description", header:["Описание", {content:"textFilter"}], css:"rank", sort:"int", fillspace:true}
    ],
        data:infoData, 
        on:{
		    "onItemClick":function(id){ 
		    getInfoWindow(this.getItem(id));}
        }
        })

}

export function refreshInfoTab() {
    projectModel.getProjects().then((infoData) => {
        $$('infoTab').clearAll();
        $$('infoTab').parse(infoData);
    })
}