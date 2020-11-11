import { Project } from "./entities/project.js";
import employeeModel from './employeeModel.js';
import { Employee, POSITION } from "./entities/employee.js";

// Класс для операций над проектами
class ProjectModel {
    constructor() {
        this.data = new Map();

        employeeModel.getEmployeeById(12).then((teamLead) => {
            employeeModel.getEmployeeById(11).then((normal) => {
                this.data.set(4, new Project(4, "ProjectA", "A Bla-Bla", '12 Petrov Sergey Sergeevich', [normal]));
                this.data.set(1, new Project(1, "ProjectB", "B Bla-Bla", '12 Petrov Sergey Sergeevich', [normal, teamLead]));
                this.data.set(2, new Project(2, "ProjectC", "C Bla-Bla", '12 Petrov Sergey Sergeevich', []));
                this.data.set(3, new Project(3, "ProjectD", "D Bla-Bla", '12 Petrov Sergey Sergeevich', []));
            })
        })
    }

    //Получение всех проектов
    getProjects() {
        return new Promise((resolve, reject) => {
            let projects = [];

            for (let project of this.data.values()) {
                projects.push(project);
            }

            resolve(projects);
        })
    }

    //Получение всех id+FIO активных тимлидов
    getAllTeamLeadsIdFIO() {
        let teamLeads = new Array();

        for (let project of this.data.values()) {
            if (!teamLeads.includes(project.teamLeadIdFIO)) {
                teamLeads.push(project.teamLeadIdFIO);
            }
        }

        return new Promise((resolve, reject) => {
            resolve(teamLeads);
        })
    }

    //Обновление данных о сотруднике в проекте
    updateProjectsByEmployee(employee) {
        if (employee.position == POSITION.teamLead) {
            let projects = this.getTeamLeadProjectsById(employee.id);
            for (let project of projects) {
                project.teamLeadIdFIO = employee.id + ' ' + employee.lastName + ' ' + employee.firstName + ' ' + employee.patronymic;
            }
        }

        let allProjects = this.getEmployeesProjectsById(employee.id);

        for (let project of allProjects) {
            for (let empl of project.employees) {
                if (empl.id == employee.id) {
                    empl.firstName = employee.firstName;
                    empl.lastName = employee.lastName;
                    empl.patronymic = employee.patronymic;
                    empl.email = employee.email;
                    empl.phone = employee.phone;
                    empl.position = employee.position;
                    this.data.set(project.id, project);
                }
            }
        }

        return new Promise((resolve, reject) => {
            resolve(employee.id);
        })

    }

    //Получение всех сотрудников проекта
    getEmployeesProjectsById(employeeId) {
        let projects = [];
        for (let entry of this.data.values()) {
            for (let empl of entry.employees) {
                if (empl.id == employeeId) {
                    projects.push(entry);
                }
            }
        }

        return projects;
    }

    //Получение ID+FIO Тимлида по id проекта
    getTeamLeadIdFIOByProjectId(projectId) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(projectId).teamLeadIdFIO);
        })
    }

    //Получение проектов по ID тимлида
    getTeamLeadProjectsById(employeeId) {
        let projects = [];
        for (let entry of this.data.values()) {
            let id = '';

            for (let i =0; i < entry.teamLeadIdFIO.length; i++) {
                if (entry.teamLeadIdFIO[i] == ' ') {
                    break;
                } else {
                    id += entry.teamLeadIdFIO[i];
                }
            }

            if (id == employeeId) {
                projects.push(entry);
            }
        }

        return projects;
    }

    //Получение сотрудников проекта
    getProjectEmployees(projectId) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(projectId).employees);
        })
    }

    //Получение проектов сотрудника
    getLimitedProjectsData(employee) {
        let projects = [];
        for (let project of this.data.values()) {
            if (project.employees.includes(employee)) {
                projects.push(project);
            }
        }

        return new Promise((resolve, reject) => {
            resolve(projects);
        })
    }

    //Получение проекта по id
    getProjectById(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(id));
        })
    }

    //Создание проекта
    createProject(project) {

        return new Promise((resolve, reject) => {
            let id = Math.random()*1000000;
            id = id - (id % 1);
    
            while (this.data.get(id) != null) {
                let id = Math.random()*1000000;
                id = id - (id % 1);
            }

            for (let item of this.data.values()) {
                if (project.name == item.name) {
                    project.name = project.name + id;
                }
            }
    
            project.id = id;
            this.data.set(id, project);
            resolve(this.data.get(project.id));
        })
    }

    //изменение проекта
    updateProject(project) {
        return new Promise((resolve, reject) => {
            this.data.set(project.id, project)
            resolve(this.data.get(project.id))
        })
    }

    //Добавление сотрудника в проект
    addEmployeeToProject(employee, projectId) {
        if (!this.data.get(projectId).employees.includes(Employee)) {
            this.data.get(projectId).employees.push(employee);
        }
    }

    //Получение названий проектов
    getProjectsNames() {
        return new Promise((resolve, reject) => {
            let projects = [];

            for (let project of this.data.values()) {
                projects.push(project.name);
            }

            resolve(projects);

        })
    }

    //Получение проекта по имени
    getProjectByName(projectName) {
        return new Promise((resolve, reject) => {
            let project;

            for (let project of this.data.values()) {
                if (project.name == projectName) {
                    resolve (project);
                }
            }

        })
    }

    //Удаление проекта
    removeProject(projectId) {
        return new Promise((resolve, reject) => {
            this.data.delete(projectId);
            resolve(projectId);
        })
    }
}

const projectModel = new ProjectModel();
export default projectModel;