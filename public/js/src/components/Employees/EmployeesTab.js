import getEmployeesTabView from './EmployeesTabView.js';
import employeeModel from '../../models/employeeModel.js';
import CEmployeeChangeWindow from './ChangeWindow/CEmployeeChangeWindow.js';

//Компонент таба сотрудников
export default class EmployeesTab {
    constructor() {
        this.view;
        this.changeWindow;
    }

    //Инициализация компонента
    init() { 

    }

    //Возвращение конфигурации компонента
    config() {
        return getEmployeesTabView();
    }

    //Прикрепление обработчиков событий
    attachEvents() {

        //инициализация используемых представлений
        this.view = {
            table : $$('employeesTable'),
        };

        //Событие вызова редактора сотрудника
        this.view.table.attachEvent('onItemClick', (id) => {
            employeeModel.getPositions().then((positions) => {
                let employee = this.view.table.getItem(id);
                let employeeChangeWindow = new CEmployeeChangeWindow();
                employeeChangeWindow.init();
                webix.ui(employeeChangeWindow.config(employee, positions)).show();
                employeeChangeWindow.attachEvents();
                this.changeWindow = $$('employeeChangeWindow');
                this.changeWindow.attachEvent('onDestruct', () => {
                    this.refreshTable();
                })
            })
        })

    }

    //Метод обновления данных в таблице
    refreshTable() {
        employeeModel.getEmployees().then((result) => {
            this.view.table.clearAll();
            this.view.table.parse(result);
            this.view.table.refreshFilter();
        })
    }

}