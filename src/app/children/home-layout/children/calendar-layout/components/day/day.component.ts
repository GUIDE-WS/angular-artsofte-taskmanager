import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {

    constructor(
        private _router: Router,
    ) {
    }

    public ngOnInit(): void {
    }

    public viewTask(id: string): void {
        this._router.navigateByUrl(`home/edit-task/${id}`);
    }
}
