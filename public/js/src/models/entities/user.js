export class User {
    constructor(id, email, password) {
		this.id = id; // id
		this.email = email; // email
		this.password = password; // password
		this.isRemoved = false; // флаг увольнения пользователя (true == уволен, false == работает)
    }
}