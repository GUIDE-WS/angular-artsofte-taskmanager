import { Injectable } from '@angular/core';
import { IAuthorizer } from '../interfaces/authorizer.service.interface';
import { IUser } from '../interfaces/user.interface';
import { userState } from '../../../../userState';

@Injectable({
    providedIn: 'root',
})
export class MockUserAuthorizerService implements IAuthorizer {

    constructor() {
    }

    public signIn(email: string, password: string): boolean {
        if (userState[email] !== undefined && userState[email].password === password) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            return true;
        }

        return false;
    }

    public signOut(): void {
    }

    public signUp(userData: IUser): boolean {
        if (userState[userData.email] === undefined) {
            userState[userData.email] = {
                password: userData.password,
                nickName: userData.nickName,
                tasks: [],
            };

            return true;
        }
        console.log(userState);

        return false;
    }
}
