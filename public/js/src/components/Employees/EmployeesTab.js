import getEmployeesTabView from './EmployeesTabView.js';
import employeeModel from '../../models/employeeModel.js';
import CEmployeeChangeWindow from './ChangeWindow/CEmployeeChangeWindow.js';

export default class EmployeesTab {
    constructor() {
        this.view;
        this.changeWindow;
    }

    init() { 

    }

    config() {
        return getEmployeesTabView();
    }

    attachEvents() {

        this.view = {
            table : $$('employeesTable'),
        };

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

    refreshTable() {
        employeeModel.getEmployees().then((result) => {
            this.view.table.clearAll();
            this.view.table.parse(result);
            this.view.table.refreshFilter();
        })
    }

}