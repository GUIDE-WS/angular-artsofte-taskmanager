import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calendar-layout',
    templateUrl: './calendar-layout.component.html',
    styleUrls: ['./calendar-layout.component.css'],
})
export class CalendarLayoutComponent implements OnInit {
    public selectedDate: Date;

    constructor() {
    }

    public ngOnInit(): void {
    }

}
