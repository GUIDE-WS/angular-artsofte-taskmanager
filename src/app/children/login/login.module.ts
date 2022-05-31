import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
    MockUserAuthorizerService,
} from './services/mock-user-authorizer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

export const authorizerServiceToken: InjectionToken<string> = new InjectionToken('Authorizer service');

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        component: SignInComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
];

@NgModule({

    declarations: [
        SignInComponent,
        SignUpComponent,
    ],
    providers: [
        {
            provide: authorizerServiceToken,
            useClass: MockUserAuthorizerService,
        },
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})

export class LoginModule {

}
