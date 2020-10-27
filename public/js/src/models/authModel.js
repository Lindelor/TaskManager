import {User} from './entities/user.js';

// AuthModel объект для авторизации
class AuthModel{

    constructor() {
        this.data = new Map();
        this.data.set(11, new User(11, "ivan90@mail.ru", 333));
        this.data.set(12, new User(12, "sergey90@bk.ru", 111));
        
    }

    createUser(user) {
        this.data.set(user.id, user);
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