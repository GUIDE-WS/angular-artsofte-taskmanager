import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userState } from '../../userState';
import {
    MockUserAuthorizerService
} from '../children/login/services/mock-user-authorizer.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
    constructor(
        private _authService: MockUserAuthorizerService,
        private _router: Router,
    ) {
    }

    public canActivate(): Observable<boolean> {
        return this._authService.isValidToken()
            .pipe(
                switchMap((res: boolean) => {
                    if (!res) {
                        this._router.navigate(['login/sign-in']);
                    }

                    return of(res);
                })
            );
    }
}
