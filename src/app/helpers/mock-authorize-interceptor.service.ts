import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpClient,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    ISignInResponseModel,
} from '../children/login/response-models/sign-in.response-model';
import {
    ISignInRequestModel,
} from '../children/login/request-models/sign-in.request-model';
import { userState } from '../../userState';
import {
    ISignUpRequestModel,
} from '../children/login/request-models/sign-up.request-model';
import {
    IIsValidRequestModel,
} from '../children/login/request-models/is-valid.request-model';

@Injectable()
export class MockAuthorizeInterceptor implements HttpInterceptor {

    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {

        return this.handleRequests(request, next);
    }

    private handleRequests(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpResponse<ISignInResponseModel>> | Observable<HttpEvent<any>> {
        console.log(request);
        if (request.url.endsWith('/sign-in') && request.method === 'POST') {
            const data: ISignInRequestModel | null | undefined = request.body;
            if (data
                && userState[data.email]
                && userState[data.email].password === data.password
            ) {
                const successToken: string = `success-token-${data.email}`;
                userState[data.email].successToken = successToken;
                const body: ISignInResponseModel = { successToken: successToken };

                return of(new HttpResponse(
                    {
                        status: 200,
                        body: body,
                    }));
            }
        }

        if (request.url.endsWith('/sign-up') && request.method === 'POST') {
            const data: ISignUpRequestModel | null | undefined = request.body;
            if (data
                && !userState[data.email]
            ) {
                userState[data.email] = {
                    password: data.password,
                    nickName: data.nickName,
                    successToken: null,
                    tasks: [],
                };

                return of(new HttpResponse(
                    {
                        status: 200,
                        body: { isSucceed: true },
                    },
                ));
            } else {
                return of(new HttpResponse(
                    {
                        status: 200,
                        body: { isSucceed: false },
                    },
                ));
            }

        }

        if (request.url.endsWith('/is-auth') && request.method === 'POST') {
            const data: IIsValidRequestModel | null | undefined = request.body;
            if (data
                && userState[data.email]
                && userState[data.email].successToken === data.jwtToken) {

                return of(new HttpResponse(
                    {
                        status: 200,
                        body: { isSucceed: true },
                    },
                ));
            } else {
                return of(new HttpResponse(
                    {
                        status: 200,
                        body: { isSucceed: false },
                    },
                ));
            }
        }

        return next.handle(request);
    }
}
