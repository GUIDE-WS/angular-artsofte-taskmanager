import { ITask } from './task.interface';

export interface ITasksSelector {
    selectTasks(): ITask[];
    selectTaskByID(id: string): ITask | null;
}
