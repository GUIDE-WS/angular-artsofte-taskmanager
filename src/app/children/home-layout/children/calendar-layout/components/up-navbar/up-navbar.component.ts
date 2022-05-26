import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-up-navbar',
    templateUrl: './up-navbar.component.html',
    styleUrls: ['./up-navbar.component.css'],
})
export class UpNavbarComponent implements OnInit {
    @Output()
    public selectedEmitDate: EventEmitter<Date> = new EventEmitter<Date>();

    public selectedDate: Date = new Date();

    constructor() {
    }

    public ngOnInit(): void {
    }

}
