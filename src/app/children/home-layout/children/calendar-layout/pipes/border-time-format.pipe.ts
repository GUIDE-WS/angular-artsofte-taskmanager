import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'borderTimeFormat',
})
export class BorderTimeFormatPipe implements PipeTransform {

    public transform(value: number): string {
        return `${value}:00`;
    }
}
