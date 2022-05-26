import { ISignUpRequestModel } from '../request-models/sign-up.request-model';
import { SignInModel } from './sign-in.model';

export class SignUpModel extends SignInModel{
    public nickName!: string;

    public override toDTO(): ISignUpRequestModel{
        return {
            nickName: this.nickName,
            email: this.email,
            password: this.hashPassword(this.password)
        };
    }
}
