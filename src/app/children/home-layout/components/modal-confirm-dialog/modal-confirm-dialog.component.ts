import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-modal-confirm-dialog',
    templateUrl: './modal-confirm-dialog.component.html',
    styleUrls: ['./modal-confirm-dialog.component.css'],
})
export class ModalConfirmDialogComponent implements OnInit {
    public clearViewEvent: Subject<void> = new Subject<void>();
    public confirmEvent: Subject<boolean> = new Subject<boolean>();

    constructor() {
    }

    public ngOnInit(): void {
    }

    public confirm(): void {
        this.confirmEvent.next(true);
        this.clearView();
    }

    public cancel(): void {
        this.confirmEvent.next(false);
        this.clearView();
    }

    private clearView(): void {
        this.clearViewEvent.next();
    }
}
