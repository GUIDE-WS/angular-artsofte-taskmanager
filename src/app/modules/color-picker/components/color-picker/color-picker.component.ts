import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent{
    @Output()
    public submittedColor: EventEmitter<string> = new EventEmitter<string>();

    public hue: string;
    public color: string;

    constructor() {
    }

    public submitColor(color: string): void {
        this.submittedColor.emit(color);
    }
}
