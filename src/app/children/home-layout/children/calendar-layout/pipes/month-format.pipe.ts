import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthFormat',
})
export class MonthFormatPipe implements PipeTransform {
    private _months: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
        'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    public transform(date: Date): string {
        return `${this._months[date.getMonth()]}, ${date.getFullYear()}`;
    }
}
