import { Priority } from './app/children/home-layout/models/priority.enum';
import { ITask } from './app/children/home-layout/interfaces/task.interface';
import { Md5 } from 'ts-md5';

export interface IUserState {
    [email: string]: {
        password: string,
        nickName: string,
        successToken: string | null,
        tasks: ITask[]
    };
}

export const authAPIUrl: string = '/api/auth';

export const userState: IUserState = {
    'guide@guide.com': {
        password: Md5.hashStr('12345'+'12345'),
        nickName: 'guide',
        successToken: null,
        tasks: [
            {
                id: '0',
                name: 'test',
                isCompleted: false,
                description: '',
                timeStart: new Date(),
                timeEnd: new Date(),
                priority: Priority.high,
                tag: '',
                color: 'red',
            },
        ],
    },
};
