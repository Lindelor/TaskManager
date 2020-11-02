import { Project } from "./entities/project.js"
// Класс для операций над проектами
class ProjectModel {
    constructor() {
        this.data = new Map();
        this.data.set(4, new Project(4, "ProjectA", "A Bla-Bla"));
        this.data.set(1, new Project(1, "ProjectB", "B Bla-Bla"));
        this.data.set(2, new Project(2, "ProjectC", "C Bla-Bla"));
        this.data.set(3, new Project(3, "ProjectD", "D Bla-Bla"));
    }

    getProjects() {
        return new Promise((resolve, reject) => {
            let projects = [];

            for (let project of this.data.values()) {
                projects.push(project);
            }

            resolve(projects);
        })
    }

    getProjectById(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(id));
        })
    }

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

    updateProject(project) {
        return new Promise((resolve, reject) => {
            this.data.set(project.id, project)
            resolve(this.data.get(project.id))
        })
    }

    getProjectsNames() {
        return new Promise((resolve, reject) => {
            let projects = [];

            for (let project of this.data.values()) {
                projects.push(project.name);
            }

            resolve(projects);

        })
    }

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

    removeProject(projectId) {
        this.data.delete(projectId);
    }
}

const projectModel = new ProjectModel();
export default projectModel;