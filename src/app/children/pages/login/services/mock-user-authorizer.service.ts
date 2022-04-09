import { Injectable } from '@angular/core';
import { IAuthorizer } from '../interfaces/authorizer.service.interface';
import { User } from '../models/user.model';
import { throttle } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class MockUserAuthorizerService implements IAuthorizer{
    private _users: User[] = new Array<User>();
    private _currentUser: User | null = null;

    constructor() {
        this._users.push(new User({
            userId: '0',
            email: 'guide@guide.com',
            password: '12345',
            nickName: 'Guide',
        }));
    }

    public signIn(email: string, password: string): boolean {
        for (const user of this._users){
            if (user.compare(email, password)){
                this._currentUser = user;

                return true;
            }
        }

        return false;
    }

    public signOut(): void {
        this._currentUser = null;
    }

    public signUp(userData: IUser): boolean {
        for (const user of this._users){
            if (user.email === userData.email){
                return false;
            }
        }
        userData.userId = String(this._users.length);
        this._users.push(new User(userData));

        return true;
    }
}
