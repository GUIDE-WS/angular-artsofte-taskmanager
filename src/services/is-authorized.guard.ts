import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
} from '@angular/router';
import { userState } from '../userState';

@Injectable({
    providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const email: string | null = localStorage.getItem('email');
        const password: string | null = localStorage.getItem('password');
        console.log(email, password);
        console.log(userState[email??'']);
        console.log(email !== null && userState[email] !== undefined && userState[email].password === password);

        return email !== null && userState[email] !== undefined && userState[email].password === password;
    }
}
