import { Priority } from './models/priority.enum';

export const userState: any = {
    'guide@guide.com': {
        password: '12345',
        nickName: 'guide',
        tasks: [
            {
                name: 'test',
                isCompleted: false,
                description: '',
                timeStart: Date.now(),
                timeEnd: null,
                priority: Priority.high,
                tag: '',
                color: '04FF00',
            },
        ],
    },
};
