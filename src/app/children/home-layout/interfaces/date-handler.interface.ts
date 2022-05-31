import { Observable } from 'rxjs';

export interface IDateHandler {
    setDate(newDate: Date): void;
    getSelectedDate(): Observable<Date>;
}
