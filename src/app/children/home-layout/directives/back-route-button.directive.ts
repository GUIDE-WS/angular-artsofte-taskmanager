import { Directive, HostListener } from '@angular/core';
import { BackNavigationService } from '../services/back-navigation.service';

@Directive({
    selector: '[appBackRouteButton]',
})
export class BackRouteButtonDirective {

    constructor(
        private _navigation: BackNavigationService
    ) {
    }

    @HostListener('click')
    public onClick(): void{
        this._navigation.back();
    }

}
