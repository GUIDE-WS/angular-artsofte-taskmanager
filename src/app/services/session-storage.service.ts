import { Injectable } from '@angular/core';
import { IJWTSession } from '../children/login/interfaces/jwt-session.interface';

@Injectable()
export class SessionStorageService implements IStorageService{
    private _sessionData!: IJWTSession | null;
    private _sessionToken: string = 'session';

    public getData(): IJWTSession | null {
        if (this._sessionData){
            return this._sessionData;
        } else {
            const sessionData: string | null = sessionStorage.getItem(this._sessionToken);
            if (sessionData) {
                this._sessionData = JSON.parse(sessionData) as IJWTSession;

                return this._sessionData;
            } else {
                return null;
            }
        }
    }

    public setData(data: IJWTSession): void {
        sessionStorage.setItem(this._sessionToken, JSON.stringify(data));
        this._sessionData = data;
    }

    public removeData(): void {
        sessionStorage.removeItem(this._sessionToken);
        this._sessionData = null;
    }
}

export interface IStorageService {
    getData() : IJWTSession | null;
    setData(data: IJWTSession): void;
    removeData(): void;
}
