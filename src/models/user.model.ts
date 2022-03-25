/**
 * Класс пользователя
 */
export class User {
    public nickName: string;
    public email: string;
    public isConfirmed: boolean;

    /**
     * @param {string} nickName Никнейм пользователя
     * @param {string} email Почта пользователя
     */
    constructor(
        nickName: string,
        email: string) {
        this.nickName = nickName;
        this.email = email;
        this.isConfirmed = false;
    }

    /**
     * Изменить статус пользователя на подтвержденный
     */
    public confirmUser(): void {
        if (this.isConfirmed) {
            return;
        }
        this.isConfirmed = true;
    }
}
