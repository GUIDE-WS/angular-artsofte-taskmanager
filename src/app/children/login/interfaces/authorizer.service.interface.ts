import { IUser } from './user.interface';


export interface IAuthorizer {
    signIn(email: string, password: string): boolean;
    signUp(userData: IUser): boolean;
    signOut(): void;
}
