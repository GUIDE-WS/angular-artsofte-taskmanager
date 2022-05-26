import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dayFormat',
})
export class DayFormatPipe implements PipeTransform {
    private _weekdays: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    public transform(date: Date): string {
        return `${date.getDate()}, ${this._weekdays[date.getDay()]}`;
    }
}
