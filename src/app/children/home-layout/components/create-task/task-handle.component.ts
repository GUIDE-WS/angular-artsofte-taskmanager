import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    MockTaskFactoryService,
} from '../../services/mock-task-factory.service';
import { BackNavigationService } from '../../services/back-navigation.service';
import { Priority } from '../../models/priority.enum';
import { TaskFormViewModel } from '../../view-models/task-form-view-model';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subject } from 'rxjs';
import {
    MockTaskSelectorService,
} from '../../services/mock-task-selector.service';
import { ITask } from '../../interfaces/task.interface';
import { MockTaskEditorService } from '../../services/mock-task-editor.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-create-task',
    templateUrl: './task-handle.component.html',
    styleUrls: ['./task-handle.component.css'],
})
export class TaskHandleComponent implements OnInit, OnDestroy {

    public viewModel: TaskFormViewModel = new TaskFormViewModel();
    public priorities: Array<[Priority, string]> = [
        [Priority.high, '!!!'],
        [Priority.medium, '!!'],
        [Priority.low, '!'],
        [Priority.none, 'none'],
    ];
    public isEditMode: boolean;
    private _isSuccess: boolean = false;
    private _taskId: string | null;
    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _taskFactory: MockTaskFactoryService,
        private _taskSelector: MockTaskSelectorService,
        private _taskEditor: MockTaskEditorService,
        private _backNavigation: BackNavigationService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.isEditMode = this._activatedRoute.snapshot.data['isEditMode'];
        if (this.isEditMode) {
            this._activatedRoute.paramMap.pipe(
                takeUntil(this._unsubscriber),
            ).subscribe((map: ParamMap) => {
                this._taskId = map.get('id')!;
            });
        }
    }

    public ngOnInit(): void {
        if (this.isEditMode && this._taskId) {
            const taskModel: ITask | null = this._taskSelector.selectTaskByID(this._taskId);
            if (taskModel) {
                this.viewModel.fromModel(taskModel);
            } else {
                alert('Задача не найдена');
            }
        }
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    public onSubmit(): void {
        this._isSuccess = this._taskFactory.createTask(this.viewModel.toModel());
        if (!this._isSuccess) {
            alert('Oopsy daisy... Что-то пошло не так');
        } else {
            this._backNavigation.back();
        }
    }

    public editTask(): void {
        this._isSuccess = this._taskEditor.editTask(this.viewModel.toModel());
        if (!this._isSuccess) {
            alert('Oopsy daisy... Что-то пошло не так');
        } else {
            this._backNavigation.back();
        }
    }
}
