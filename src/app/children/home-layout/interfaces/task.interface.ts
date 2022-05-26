import { Priority } from '../models/priority.enum';

export interface ITask {
    id: string;
    name: string;
    isCompleted: boolean;
    description: string;
    timeStart: Date | null;
    timeEnd: Date | null;
    priority: Priority;
    tag: string;
    color: string;
}
