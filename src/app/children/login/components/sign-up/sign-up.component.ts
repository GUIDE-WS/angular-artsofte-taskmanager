import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    MockUserAuthorizerService,
} from '../../services/mock-user-authorizer.service';
import { Router } from '@angular/router';
import { SignUpFormViewModel } from '../../view-models/sign-up-form.view-model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
    public viewModel: SignUpFormViewModel = new SignUpFormViewModel();

    private _isRegistered: boolean = false;
    private _unsubscriber: Subject<void> = new Subject<void>();

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
            .signUp(this.viewModel.toModel())
            .pipe(
                takeUntil(this._unsubscriber),
            )
            .subscribe((value: boolean) => {
                this._isRegistered = value;
                if (this._isRegistered) {
                    alert('Вы успешно зарегистрировались');
                    this._router.navigate(['login/sign-in']);
                } else {
                    alert('Пользователь с таким email уже зарегистрирован');
                }
            });
    }

}
