import { Injectable } from '@angular/core';
import { ITasksSelector } from '../interfaces/tasks-selector.interface';
import { userState } from '../../../../userState';
import { Task } from '../models/task.model';
import { ITask } from '../interfaces/task.interface';
import {
    SessionStorageService
} from '../../../services/session-storage.service';

@Injectable()
export class MockTaskSelectorService implements ITasksSelector {

    constructor(
        private _sessionStorageService: SessionStorageService,
    ) {
    }

    public selectTasks(): ITask[] {
        const email: string | null = sessionStorage.getItem('email');
        if (email !== null && userState[email] !== undefined) {
            const userTasks: Task[] = [];
            for (const task of userState[email].tasks) {
                userTasks.push(new Task(task));
            }

            return userTasks;
        }

        return [];
    }

    public selectTaskByID(id: string): ITask | null {
        const email: string | undefined = this._sessionStorageService.getSessionData()?.email;
        console.log(sessionStorage);
        if (email !== undefined && userState[email] !== undefined) {
            for (const task of userState[email].tasks) {
                if (task.id === id) {
                    return task;
                }
            }
        }

        return null;
    }
}
