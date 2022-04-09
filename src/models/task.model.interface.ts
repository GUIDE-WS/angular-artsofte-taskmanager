import { Priority } from './priority.enum';

export interface ITask {
    name: string;
    isCompleted: boolean;
    description: string;
    timeStart: Date | null;
    timeEnd: Date | null;
    priority: Priority;
    tag: string;
    color: string;
}
