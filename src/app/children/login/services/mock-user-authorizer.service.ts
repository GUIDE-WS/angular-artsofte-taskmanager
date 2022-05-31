import { Inject, Injectable } from '@angular/core';
import { IAuthorizer } from '../interfaces/authorizer.service.interface';
import { authAPIUrl } from '../../../../userState';
import { SignInModel } from '../models/sign-in.model';
import { ISignInRequestModel } from '../request-models/sign-in.request-model';
import { Observable, of, switchMap } from 'rxjs';
import {
    IRequestOptions,
} from '../../../modules/http-request/interfaces/request-options.interface';
import { RequestMethodType } from '../../../modules/http-request/enums';
import {
    HttpService,
} from '../../../modules/http-request/services/http.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
    IStorageService
} from '../../../services/session-storage.service';
import {
    ISignInResponseModel,
} from '../response-models/sign-in.response-model';
import { IIsValidRequestModel } from '../request-models/is-valid.request-model';
import { IJWTSession } from '../interfaces/jwt-session.interface';
import {
    IIsValidResponseModel,
} from '../response-models/is-valid.response-model';
import { SignUpModel } from '../models/sign-up-model';
import { ISignUpRequestModel } from '../request-models/sign-up.request-model';
import {
    ISignUpResponseModel,
} from '../response-models/sign-up.response-model';
import { dataStorageToken } from '../../../app.module';

@Injectable({
    providedIn: 'root',
})
export class MockUserAuthorizerService implements IAuthorizer {

    constructor(
        private _httpService: HttpService,
        private _httpClient: HttpClient,
        @Inject(dataStorageToken)
        private _storageService: IStorageService,
    ) {
    }

    public signIn(model: SignInModel): Observable<boolean> {
        const data: ISignInRequestModel = model.toDTO();
        const request: IRequestOptions<ISignInRequestModel> = {
            url: `${authAPIUrl}/sign-in`,
            body: data,
            method: RequestMethodType.post,
        };

        return this._httpService.request<ISignInResponseModel, ISignInRequestModel>(request)
            .pipe(
                switchMap(
                    (result: HttpResponse<ISignInResponseModel>) => {
                        if (result.body?.successToken) {
                            this._storageService.setData({
                                email: data.email,
                                token: result.body.successToken,
                            });

                            return of(true);
                        }

                        return of(false);
                    },
                ),
            );
    }

    public signUp(model: SignUpModel): Observable<boolean> {
        const data: ISignUpRequestModel = model.toDTO();
        console.log(data);
        const request: IRequestOptions<ISignUpRequestModel> = {
            url: `${authAPIUrl}/sign-up`,
            body: data,
            method: RequestMethodType.post,
        };

        return this._httpService.request<ISignUpResponseModel, ISignUpRequestModel>(request)
            .pipe(
                switchMap(
                    (result: HttpResponse<ISignUpResponseModel>) => {
                        return result.body?.isSucceed ? of(result.body.isSucceed) : of(false);
                    },
                ),
            );
    }

    public isValidToken(): Observable<boolean> {
        const data: IJWTSession | null = this._storageService.getData();
        if (!data) {
            return of(false);
        }

        const request: IRequestOptions<IIsValidRequestModel> = {
            url: `${authAPIUrl}/is-auth`,
            body: {
                email: data.email,
                jwtToken: data.token,
            },
            method: RequestMethodType.post,
        };

        return this._httpService.request<IIsValidResponseModel, IIsValidRequestModel>(request)
            .pipe(
                switchMap(
                    (result: HttpResponse<IIsValidResponseModel>) => {
                        return result.body?.isSucceed ? of(result.body.isSucceed) : of(false);
                    },
                ),
            );
    }

    public signOut(): void {
        this._storageService.removeData();
    }
}
