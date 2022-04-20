import { IUser } from '../interfaces/user.interface';

/**
 * Класс пользователя
 */
export class User implements IUser {
    public nickName: string;
    public email: string;
    public password: string;

    /**
     * @param {IUser} data данные пользователя
     */
    constructor(data: IUser) {
        this.nickName = data.nickName;
        this.email = data.email;
        this.password = data.password;
    }

    /**
     * Сравнивает пользователей по ID
     * @param email
     * @param password
     */
    public compare(email: string, password: string): boolean{
        return this.email === email && this.password === password;
    }
}
