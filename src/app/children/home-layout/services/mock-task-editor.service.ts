import { Injectable } from '@angular/core';
import { ITaskEditor } from '../interfaces/task-editor.interface';
import { ITask } from '../interfaces/task.interface';
import { userState } from '../../../../userState';
import { Task } from '../models/task.model';
import {
    SessionStorageService
} from '../../../services/session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class MockTaskEditorService implements ITaskEditor {

    constructor(
        private _sessionStorageService: SessionStorageService,
    ) {
    }

    public editTask(data: ITask): boolean {
        debugger;
        const email: string | undefined = this._sessionStorageService.getSessionData()?.email;
        if (email !== undefined && userState[email] !== undefined) {
            for (let task of userState[email].tasks) {
                if (task.id === data.id) {
                    task = new Task(data);

                    return true;
                }
            }
        }

        return false;
    }
}
