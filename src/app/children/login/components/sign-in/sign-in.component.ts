import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInFormViewModel } from '../../view-models/sign-in-form.view-model';
import {
    MockUserAuthorizerService
} from '../../services/mock-user-authorizer.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
    public viewModel: SignInFormViewModel = new SignInFormViewModel();

    private _unsubscriber: Subject<void> = new Subject<void>();
    private _isAuthorized: boolean = false;

    constructor(
        private _authService: MockUserAuthorizerService,
        private _router: Router,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    public onSubmit(): void {
        this._authService
            .signIn(this.viewModel.toModel())
            .pipe(
                takeUntil(this._unsubscriber),
            )
            .subscribe((value: boolean) => {
                this._isAuthorized = value;
                if (!this._isAuthorized){
                    alert('Неверный email пользователя или пароль');
                } else {
                    this._router.navigate(['/home/calendar']);
                }
            });
    }
}
