import getInfoWindow from './UserInfoView.js';

//Компонент окна информации о сотруднике
export default class CUserInfo {
    constructor(currentEmployee) {
        this.view;
        this.currentEmployee = currentEmployee;
    }

    //Инициализация компонента
    init() { 
    }

    //Возвращение вебикс конфигурации компонента
    config() {
        return webix.ui(getInfoWindow(this.currentEmployee));
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            window : $$("infoWindow"),
            windowCancelButton : $$("infoFormClose"),
            form : $$("infoForm"),
        };

        //Закрытие окна информации
        this.view.windowCancelButton.attachEvent('onItemClick', () => {
            this.view.form.clear();
            this.view.window.close();
        })
    }

}