import { ITask } from './task.interface';

export interface ITaskFactory {
    createTask(data: ITask): boolean;
}
