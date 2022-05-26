import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class BackNavigationService {
    private _history: string[] = [];

    constructor(
        private _router: Router,
        private _location: Location,
    ) {
        this._router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this._history.push(event.urlAfterRedirects);
            }
        });
    }

    public back(): void{
        this._history.pop();
        if (this._history.length){
            this._location.back();
        } else {
            this._router.navigateByUrl('/home');
        }
    }
}
