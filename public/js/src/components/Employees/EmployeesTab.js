import getEmployeesTabView from './EmployeesTabView.js';
import employeeModel from '../../models/employeeModel.js';
import CEmployeeChangeWindow from './CEmployeeChangeWindow.js';

export default class EmployeesTab {
    constructor() {
        this.view;
        this.currentEmployee;
    }

    init() { 

    }

    config(currentEmployee) {
        this.currentEmployee = currentEmployee;
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
            })
        })

        this.view.table.attachEvent('onViewShow', () => {
            $$('addTask').hide();
            $$('addProject').hide();
            $$('registerUser').show();
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