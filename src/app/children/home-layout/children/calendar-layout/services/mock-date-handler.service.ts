import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IDateHandler } from '../../../interfaces/date-handler.interface';

@Injectable()
export class MockDateHandlerService implements IDateHandler {
    private readonly _selectedDate$: BehaviorSubject<Date>;

    constructor() {
        this._selectedDate$ = new BehaviorSubject<Date>(new Date());
    }

    public setDate(newDate: Date): void {
        this._selectedDate$.next(newDate);
    }

    public getSelectedDate(): BehaviorSubject<Date> {
        return this._selectedDate$;
    }
}
