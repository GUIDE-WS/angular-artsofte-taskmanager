import { User } from './user.model';
import { Task } from './task.model';

export interface ITasksSelector {
    selectTasks(user: User): Task[];
}
