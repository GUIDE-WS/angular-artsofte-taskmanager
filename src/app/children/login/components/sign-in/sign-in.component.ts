import { Component, OnInit } from '@angular/core';
import {
    MockUserAuthorizerService,
} from '../../services/mock-user-authorizer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
    public signInForm: FormGroup = new FormGroup({
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userPassword: new FormControl('', Validators.required),
    });

    private _isAuthorized: boolean = false;

    constructor(
        private _authService: MockUserAuthorizerService,
        private _router: Router,
    ) {
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {
        this._isAuthorized = this._authService.signIn(
            this.signInForm.controls['userEmail'].value,
            this.signInForm.controls['userPassword'].value,
        );

        if (!this._isAuthorized){
            alert('Неверный email пользователя или пароль');
        } else {
            this._router.navigate(['/home']);
        }
    }

}
