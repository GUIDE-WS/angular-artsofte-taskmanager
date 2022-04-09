import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
    MockUserAuthorizerService
} from './services/mock-user-authorizer.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    bootstrap: [SignUpComponent],

    declarations: [
        SignInComponent,
        SignUpComponent,
    ],
    providers: [
        MockUserAuthorizerService,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        SignInComponent,
        SignUpComponent,
    ],
})

export class LoginModule {

}
