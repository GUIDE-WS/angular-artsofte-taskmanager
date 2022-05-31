import { Inject, Injectable } from '@angular/core';
import { ITaskFactory } from '../interfaces/task-factory.interface';
import { ITask } from '../interfaces/task.interface';
import { Task } from '../models/task.model';
import { userState } from '../../../../userState';
import {
    IStorageService
} from '../../../services/session-storage.service';
import { dataStorageToken } from '../../../app.module';

@Injectable({
    providedIn: 'root',
})
export class MockTaskFactoryService implements ITaskFactory {

    constructor(
        @Inject(dataStorageToken)
        private _storageService: IStorageService,
    ) {
    }

    public createTask(data: ITask): boolean {
        debugger;
        const newTask: Task = new Task(data);
        const email: string | undefined = this._storageService.getData()?.email;
        if (email !== undefined && userState[email] !== undefined) {
            newTask.id = userState[email].tasks.length.toString();
            userState[email].tasks.push(newTask);
            console.log(newTask);

            return true;
        }

        return false;
    }
}
