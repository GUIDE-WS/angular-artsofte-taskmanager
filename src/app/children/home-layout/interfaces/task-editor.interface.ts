import { ITask } from './task.interface';

export interface ITaskEditor {
    editTask(task: ITask): boolean;
}
