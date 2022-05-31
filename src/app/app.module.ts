import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './children/login/login.module';
import { RouterModule, Routes } from '@angular/router';
import {
    HomeLayoutModule,
} from './children/home-layout/home-layout.module';
import { IsAuthorizedGuard } from './services/is-authorized.guard';
import { HttpService } from './modules/http-request/services/http.service';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
} from '@angular/common/http';
import {
    SessionStorageService
} from './services/session-storage.service';
import {
    MockAuthorizeInterceptor
} from './helpers/mock-authorize-interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const dataStorageToken: InjectionToken<string> = new InjectionToken('Data storage service');
const routers: Routes = [
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
    {
        path: '**',
        redirectTo: 'not-found',
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        canActivate: [IsAuthorizedGuard],
        pathMatch: 'full',
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        RouterModule.forRoot(routers),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [
        IsAuthorizedGuard,
        HttpService,
        HttpClient,
        {
            provide: dataStorageToken,
            useClass: SessionStorageService
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockAuthorizeInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
})
/**
 *
 */
export class AppModule {
}
