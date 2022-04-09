import { Injectable } from '@angular/core';
import { ITasksSelector } from './tasks-selector.model.interface';
import { Task } from './task.model';

@Injectable({
    providedIn: 'root',
})
/**
 */
export class TaskMockSelectorService implements ITasksSelector {
    private _tasks: Task[][] = [
        [new Task('a'), new Task('b')],
        [new Task('c')],
        [new Task('d'), new Task('e'), new Task('f')],
    ];

    /**
     */
    constructor() {
    }

    /**
     * @param {string} userId ID пользователя
     * @return {Task[]} Задачи пользователя
     */
    public selectTasks(userId: string): Task[] {
        return this._tasks[Number(userId)];
    }
}
