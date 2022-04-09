import { Component, OnInit } from '@angular/core';
import {
    MockUserAuthorizerService,
} from '../../services/mock-user-authorizer.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
    public signInForm: FormGroup = new FormGroup({
        userEmail: new FormControl(),
        userPassword: new FormControl(),
    });

    private _isAuthorized: boolean = false;

    constructor(
        private _authService: MockUserAuthorizerService,
    ) {
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {
        console.log(
            this.signInForm.controls['userEmail'].value,
            this.signInForm.controls['userPassword'].value);

        this._isAuthorized = this._authService.signIn(
            this.signInForm.controls['userEmail'].value,
            this.signInForm.controls['userPassword'].value,
        );

        console.log(this._isAuthorized);
    }

}
