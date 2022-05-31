import { Inject, Injectable } from '@angular/core';
import { ITaskEditor } from '../interfaces/task-editor.interface';
import { ITask } from '../interfaces/task.interface';
import { userState } from '../../../../userState';
import { Task } from '../models/task.model';
import {
    IStorageService,
} from '../../../services/session-storage.service';
import { dataStorageToken } from '../../../app.module';

@Injectable()
export class MockTaskEditorService implements ITaskEditor {

    constructor(
        @Inject(dataStorageToken)
        private _storageService: IStorageService,
    ) {
    }

    public editTask(data: ITask): boolean {
        const email: string | undefined = this._storageService.getData()?.email;
        debugger;
        if (email !== undefined && userState[email] !== undefined) {
            for (let i: number = 0; i < userState[email].tasks.length; i++){
                const task: ITask = userState[email].tasks[i];
                if (task.id === data.id) {
                    userState[email].tasks[i] = new Task(data);

                    return true;
                }
            }
        }

        return false;
    }
}
