import { ISignInRequestModel } from '../request-models/sign-in.request-model';
import { Md5 } from 'ts-md5';

export class SignInModel {
    public email!: string;
    public password!: string;

    public toDTO(): ISignInRequestModel {
        return {
            email: this.email,
            password: this.hashPassword(this.password)
        };
    }

    protected hashPassword(password: string): string {
        return Md5.hashStr(password + password).toString();
    }
}
