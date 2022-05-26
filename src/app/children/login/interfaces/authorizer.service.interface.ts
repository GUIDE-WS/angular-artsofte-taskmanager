import { IUser } from './user.interface';
import { SignInModel } from '../models/sign-in.model';
import { Observable } from 'rxjs';


export interface IAuthorizer {
    signIn(model: SignInModel): Observable<boolean>;
    signUp(userData: IUser): Observable<boolean>;
    signOut(): void;
}
