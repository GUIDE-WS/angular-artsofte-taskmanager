import { Component, Inject, OnInit } from '@angular/core';
import { BackNavigationService } from '../../services/back-navigation.service';
import { Priority } from '../../models/priority.enum';
import { TaskFormViewModel } from '../../view-models/task-form-view-model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import {
    taskEditorToken,
    taskFactoryToken,
    taskSelectorToken,
} from '../../home-layout.module';
import { ITaskFactory } from '../../interfaces/task-factory.interface';
import { ITasksSelector } from '../../interfaces/tasks-selector.interface';
import { ITaskEditor } from '../../interfaces/task-editor.interface';

@Component({
    selector: 'app-task-handler',
    templateUrl: './task-handle.component.html',
    styleUrls: ['./task-handle.component.css'],
})
export class TaskHandleComponent implements OnInit {

    public viewModel: TaskFormViewModel = new TaskFormViewModel();
    public priorities: Array<[Priority, string]> = [
        [Priority.high, '!!!'],
        [Priority.medium, '!!'],
        [Priority.low, '!'],
        [Priority.none, 'none'],
    ];
    public isEditMode: boolean;
    public isConfirm: Subject<boolean>;
    private _isSuccess: boolean = false;
    private readonly _taskId: string | null;

    constructor(
        @Inject(taskFactoryToken)
        private _taskFactory: ITaskFactory,
        @Inject(taskSelectorToken)
        private _taskSelector: ITasksSelector,
        @Inject(taskEditorToken)
        private _taskEditor: ITaskEditor,
        private _backNavigation: BackNavigationService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this.isEditMode = this._activatedRoute.snapshot.data['isEditMode'];
        if (this.isEditMode) {
            this._taskId = this._activatedRoute.snapshot.paramMap.get('id');
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

    public onSubmit(): void {
        this._isSuccess = this._taskFactory.createTask(this.viewModel.toModel());
        if (!this._isSuccess) {
            alert('Oopsy daisy... Что-то пошло не так');
        } else {
            this._backNavigation.back();
        }
    }

    public editTask(): void {
        this.isConfirm.subscribe(
            (value: boolean) => {
                if(value) {
                    this._isSuccess = this._taskEditor.editTask(this.viewModel.toModel());
                    if (!this._isSuccess) {
                        alert('Oopsy daisy... Что-то пошло не так');
                    } else {
                        this._backNavigation.back();
                    }
                }
            }
        );
    }
}
