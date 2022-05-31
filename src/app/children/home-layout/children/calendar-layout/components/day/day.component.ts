import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITask } from '../../../../interfaces/task.interface';
import { taskSelectorToken } from '../../../../home-layout.module';
import { dateHandlerToken } from '../../calendar-layout.module';
import { IDateHandler } from '../../../../interfaces/date-handler.interface';
import {
    ITasksSelector,
} from '../../../../interfaces/tasks-selector.interface';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit, OnDestroy {
    public borderTimes: Array<{ time: number, style: string }> = [];
    public selectedDate: Date;
    public dateSubscription$: Subscription;
    public tasks: Array<{ task: ITask, style: { top: string, backgroundColor: string, height: string } }> = [];

    constructor(
        private _router: Router,
        @Inject(dateHandlerToken)
        private _dateHandler: IDateHandler,
        @Inject(taskSelectorToken)
        private _taskSelector: ITasksSelector,
    ) {
    }

    public ngOnInit(): void {
        for (let i: number = 0; i < 25; i++) {
            const timeStyle: string = `top: calc(${i * 20})%`;
            this.borderTimes.push({ time: i, style: timeStyle });
        }
        this.dateSubscription$ = this._dateHandler.getSelectedDate().subscribe(
            (value: Date) => {
                this.selectedDate = new Date(value.toISOString());
                this.drawComponent();
            },
        );
    }

    public ngOnDestroy(): void {
        this.dateSubscription$.unsubscribe();
    }

    public viewTask(id: string): void {
        this._router.navigateByUrl(`home/edit-task/${id}`);
    }

    private drawComponent(): void {
        this.tasks = [];
        const selectedTasks: ITask[] = this._taskSelector.selectTasks()
            .filter((value: ITask) => value.timeStart !== null && this.compareDate(value.timeStart, this.selectedDate));
        for (const task of selectedTasks) {
            const taskStyle: { top: string, backgroundColor: string, height: string } = {
                top: `calc(${((task.timeStart?.getHours() ?? 0) * 60 + (task.timeStart?.getMinutes() ?? 1)) / 1440 * 1080})px`,
                backgroundColor: task.color,
                height: `calc(${Math.abs((task.timeStart?.getHours() ?? 0) * 60 + (task.timeStart?.getMinutes() ?? 1) - (task.timeEnd?.getHours() ?? 1) * 60 + (task.timeEnd?.getMinutes() ?? 1)) / 1440 * 100}%)`,
            };
            this.tasks.push({ task: task, style: taskStyle });
        }
    }

    private compareDate(firs: Date, second: Date): boolean {
        return firs.getDate() === second.getDate()
            && firs.getMonth() === second.getMonth()
            && firs.getFullYear() === second.getFullYear();
    }
}

