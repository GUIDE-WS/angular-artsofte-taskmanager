import { Component, OnInit } from '@angular/core';
import {
    MockUserAuthorizerService,
} from '../../services/mock-user-authorizer.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../../interfaces/user.interface';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
    public signUpForm: FormGroup = new FormGroup({
        userNickName: new FormControl(),
        userEmail: new FormControl(),
        userPassword: new FormControl(),
    });
    private _isRegistered: boolean = false;

    constructor(
        private _authService: MockUserAuthorizerService,
    ) {
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {
        const data: IUser = {
            userId: '',
            email: this.signUpForm.controls['userEmail'].value,
            password: this.signUpForm.controls['userPassword'].value,
            nickName: this.signUpForm.controls['userNickName'].value,
        };
        console.log(data);

        this._isRegistered = this._authService.signUp(data);
        if (this._isRegistered){
            alert('Вы успешно зарегистрировались');
        }
        console.log(this._isRegistered);
    }

}
