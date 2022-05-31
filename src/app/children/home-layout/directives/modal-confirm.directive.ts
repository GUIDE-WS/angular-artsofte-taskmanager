import {
    ComponentRef,
    Directive, EventEmitter,
    HostListener,
    Input,
    Output,
    ViewContainerRef,
} from '@angular/core';
import {
    ModalConfirmDialogComponent,
} from '../components/modal-confirm-dialog/modal-confirm-dialog.component';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appModalConfirm]',
})
export class ModalConfirmDirective {
    @Input()
    public methodAfterConfirm: any;

    @Output()
    public isConfirm: EventEmitter<Subject<boolean>> = new EventEmitter<Subject<boolean>>();

    constructor(
        private _viewContainer: ViewContainerRef,
    ) {
    }


    @HostListener('click')
    public click(event: MouseEvent): void {
        this._viewContainer.clear();

        const componentRef: ComponentRef<ModalConfirmDialogComponent>
            = this._viewContainer.createComponent(ModalConfirmDialogComponent);

        componentRef.instance.clearViewEvent.subscribe(() => {
            this._viewContainer.clear();
        });

        this.isConfirm.emit(componentRef.instance.confirmEvent);
    }
}
