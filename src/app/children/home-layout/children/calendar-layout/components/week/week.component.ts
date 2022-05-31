import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITask } from '../../../../interfaces/task.interface';
import { Router } from '@angular/router';
import { dateHandlerToken } from '../../calendar-layout.module';
import { IDateHandler } from '../../../../interfaces/date-handler.interface';
import {
    taskSelectorToken,
} from '../../../../home-layout.module';
import {
    ITasksSelector
} from '../../../../interfaces/tasks-selector.interface';

@Component({
    selector: 'app-week',
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.css'],
})
export class WeekComponent implements OnInit, OnDestroy {
    public borderTimes: Array<{ time: number, style: string }> = [];
    public selectedDate: Date;
    public dateSubscription$: Subscription;
    public tasks: Array<Array<{ task: ITask, style: { top: string, backgroundColor: string, height: string } }>> =
        [[],[],[],[],[],[],[]];

    constructor(
        private _router: Router,
        @Inject(dateHandlerToken)
        private _dateHandler: IDateHandler,
        @Inject(taskSelectorToken)
        private _taskSelector: ITasksSelector,
    ) {
        this.dateSubscription$ = this._dateHandler.getSelectedDate().subscribe(
            (value: Date) => {
                this.selectedDate = value;
                this.selectedDate.setHours(0);
            },
        );
    }

    public ngOnInit(): void {
        for (let i: number = 0; i < 25; i++) {
            const timeStyle: string = `top: calc(${i * 20})%`;
            this.borderTimes.push({ time: i, style: timeStyle });
        }
        const selectedTasks: ITask[][] = this.selectWeekTasks();
        for (let i: number = 0; i < selectedTasks.length; i++) {
            for (const task of selectedTasks[i]) {
                const taskStyle: { top: string, backgroundColor: string, height: string } = {
                    top: `calc(${((task.timeStart?.getHours() ?? 1) * 60 + (task.timeStart?.getMinutes() ?? 1)) / 1440 * 1080})px`,
                    backgroundColor: task.color,
                    height: `calc(${((task.timeStart?.getHours() ?? 1) * 60 + (task.timeStart?.getMinutes() ?? 1) - (task.timeEnd?.getHours() ?? 1) * 60 + (task.timeEnd?.getMinutes() ?? 1)) / 1440 * 100}%)`,
                };

                this.tasks[i].push({ task: task, style: taskStyle });
            }
        }
    }

    public ngOnDestroy(): void {
        this.dateSubscription$.unsubscribe();
    }

    public viewTask(id: string): void {
        this._router.navigateByUrl(`home/edit-task/${id}`);
    }

    private selectWeekTasks(): ITask[][] {
        const currentMilliseconds: number = this.selectedDate.getMilliseconds();
        const currentWeekDay: number = this.selectedDate.getDay();
        const firstWeekDay: number = 0;
        const lastWeekDay: number = 6;
        const sevenDaysMilliseconds: number = 604800000;
        const selectedTasks: ITask[][] = [[], [], [], [], [], [], []];
        for (const task of this._taskSelector.selectTasks()
            .filter((t: ITask) => t.timeStart
                && (currentMilliseconds - t.timeStart?.getMilliseconds()
                    > (sevenDaysMilliseconds / (firstWeekDay - currentWeekDay))
                || (currentMilliseconds - t.timeStart?.getMilliseconds()
                    < (sevenDaysMilliseconds / (lastWeekDay - currentWeekDay)))))) {
            if (task.timeStart){
                selectedTasks[task.timeStart?.getDay()].push(task);
            }
        }

        return selectedTasks;
    }
}
