import { Injectable } from '@angular/core';
import { ITaskFactory } from '../interfaces/task-factory.interface';
import { ITask } from '../interfaces/task.interface';
import { Task } from '../models/task.model';
import { userState } from '../../../../userState';
import {
    SessionStorageService
} from '../../../services/session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class MockTaskFactoryService implements ITaskFactory {

    constructor(
        private _sessionStorageService: SessionStorageService,
    ) {
    }

    public createTask(data: ITask): boolean {
        const newTask: Task = new Task(data);
        const email: string | undefined = this._sessionStorageService.getSessionData()?.email;
        if (email !== undefined && userState[email] !== undefined) {
            newTask.id = userState[email].tasks.length.toString();
            userState[email].tasks.push(newTask);
            console.log(newTask);

            return true;
        }

        return false;
    }
}
