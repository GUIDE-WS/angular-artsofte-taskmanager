import { Task } from './task.model';

export interface ITasksSelector {
    selectTasks(userId: string): Task[];
}
