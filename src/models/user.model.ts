/**
 * Класс пользователя
 */
export class User {
    private _nickName: string;
    private _email: string;
    private _isConfirmed: boolean;

    /**
     * @param {string} nickName Никнейм пользователя
     * @param {string} email Почта пользователя
     */
    constructor(
        nickName: string,
        email: string) {
        this._nickName = nickName;
        this._email = email;
        this._isConfirmed = false;
    }

    /**
     * Изменить статус пользователя на подтвержденный
     */
    public confirmUser(): void {
        if (this._isConfirmed) {
            return;
        }
        this._isConfirmed = true;
    }
}
