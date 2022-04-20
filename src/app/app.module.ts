import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './children/login/login.module';
import { RouterModule, Routes } from '@angular/router';
import {
    HomeLayoutModule
} from './children/home-layout/home-layout.module';
import { IsAuthorizedGuard } from '../services/is-authorized.guard';

const routers: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: (): Promise<LoginModule> => import ('./children/login/login.module')
            .then((m: any) => m.LoginModule),
    },
    {
        path: 'home',
        loadChildren: (): Promise<HomeLayoutModule> => import('./children/home-layout/home-layout.module')
            .then((m: any) => m.HomeLayoutModule),
        canActivate: [IsAuthorizedGuard],
    },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        RouterModule.forRoot(routers),
        BrowserModule,
        BrowserAnimationsModule,
    ],
    providers: [IsAuthorizedGuard],
    bootstrap: [AppComponent],
})
/**
 *
 */
export class AppModule {
}
