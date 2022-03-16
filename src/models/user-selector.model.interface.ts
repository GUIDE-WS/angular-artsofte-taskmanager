import { User } from './user.model';

export interface IUserSelector {
    selectUser(email: string): User;
}
