import {User} from './entities/user.js';

// AuthModel объект для авторизации
class AuthModel{

    constructor() {
        this.data = new Map();
        this.data.set(11, new User(11, "ivan90@mail.ru", 333));
        this.data.set(12, new User(12, "sergey90@bk.ru", 111));
    }

    //Удаление юзера
    removeUser(userId) {
        this.data.get(userId).isRemoved = true;
        return new Promise((resolve, reject) => {
            resolve(userId);
        });
    }

    //Восстановление юзера
    restoreUser(userId) {
        this.data.get(userId).isRemoved = false;
        return new Promise((resolve, reject) => {
            resolve(userId);
        });
    }

    //Создание юзера
    createUser(user) {
        this.data.set(user.id, user);
        return new Promise((resolve, reject) => {
            resolve(user.id);
        });
    }

    //Изменение юзера
    updateUser(user) {
        this.data.set(user.id, user);
        return new Promise((resolve, reject) => {
            resolve(user.id);
        })
    }

    // выход из учетной записи
    logout() {
        return true;
    }

    // вход в учетную запись
    login() {
        return true;
    }

    // получение пользователя по ID
    getUserById(id) {
        return new Promise((resolve, reject) => {
            resolve(this.data.get(id));
        })
    }
}

const authModel  = new AuthModel();
export default authModel