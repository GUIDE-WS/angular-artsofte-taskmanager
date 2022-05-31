import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
    MockDateHandlerService,
} from '../../services/mock-date-handler.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { dateHandlerToken } from '../../calendar-layout.module';
import { IDateHandler } from '../../../../interfaces/date-handler.interface';

@Component({
    selector: 'app-up-navbar',
    templateUrl: './up-navbar.component.html',
    styleUrls: ['./up-navbar.component.css'],
})
export class UpNavbarComponent implements OnInit, OnDestroy {
    public selectedDate: Date = new Date();
    private _unsubscriber$: Subject<void> = new Subject<void>();

    constructor(
        @Inject(dateHandlerToken)
        private _dateHandler: IDateHandler,
    ) {
        this._dateHandler.getSelectedDate().pipe(
            takeUntil(this._unsubscriber$),
        )
            .subscribe((value: Date) => {
                this.selectedDate = value;
            });
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this._unsubscriber$.next();
        this._unsubscriber$.complete();
    }

    public changeSelectedDay(newDay: number): void {
        this.selectedDate.setDate(newDay);
        this._dateHandler.setDate(this.selectedDate);
    }
}
