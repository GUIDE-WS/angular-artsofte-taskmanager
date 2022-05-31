import { Inject, Injectable } from '@angular/core';
import { ITasksSelector } from '../interfaces/tasks-selector.interface';
import { userState } from '../../../../userState';
import { Task } from '../models/task.model';
import { ITask } from '../interfaces/task.interface';
import {
    IStorageService
} from '../../../services/session-storage.service';
import { dataStorageToken } from '../../../app.module';

@Injectable()
export class MockTaskSelectorService implements ITasksSelector {

    constructor(
        @Inject(dataStorageToken)
        private _storageService: IStorageService,
    ) {
    }

    public selectTasks(): ITask[] {
        const email: string | undefined = this._storageService.getData()?.email;
        if (email !== undefined && userState[email] !== undefined) {
            const userTasks: Task[] = [];
            for (const task of userState[email].tasks) {
                userTasks.push(new Task(task));
            }

            return userTasks;
        }

        return [];
    }

    public selectTaskByID(id: string): ITask | null {
        const email: string | undefined = this._storageService.getData()?.email;
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
