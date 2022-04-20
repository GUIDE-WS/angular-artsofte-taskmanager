import { Component, OnInit } from '@angular/core';
import {
    MockUserAuthorizerService,
} from '../../services/mock-user-authorizer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
    public signUpForm: FormGroup = new FormGroup({
        userNickName: new FormControl('', Validators.required),
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userPassword: new FormControl('', Validators.required),
    });
    private _isRegistered: boolean = false;

    constructor(
        private _authService: MockUserAuthorizerService,
        private _router: Router,
    ) {
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {
        const data: IUser = {
            email: this.signUpForm.controls['userEmail'].value,
            password: this.signUpForm.controls['userPassword'].value,
            nickName: this.signUpForm.controls['userNickName'].value,
        };
        this._isRegistered = this._authService.signUp(data);
        if (this._isRegistered){
            alert('Вы успешно зарегистрировались');
            this._router.navigate(['login/sign-in']);
        } else {
            alert('Пользователь с таким email уже зарегистрирован');
        }
    }

}
