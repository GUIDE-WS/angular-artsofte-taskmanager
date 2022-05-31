import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpNavbarComponent } from './components/up-navbar/up-navbar.component';
import { DayComponent } from './components/day/day.component';
import { WeekComponent } from './components/week/week.component';
import {
    CalendarLayoutComponent,
} from './components/calendar-layout/calendar-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MonthFormatPipe } from './pipes/month-format.pipe';
import { DayFormatPipe } from './pipes/day-format.pipe';
import { BorderTimeFormatPipe } from './pipes/border-time-format.pipe';
import {
    MockDateHandlerService
} from './services/mock-date-handler.service';

export const dateHandlerToken: InjectionToken<string> = new InjectionToken<string>('Date handler service');
const routes: Routes = [
    {
        path: '',
        component: CalendarLayoutComponent,
        children: [
            {
                path: 'day',
                component: DayComponent,
            },
            {
                path: 'week',
                component: WeekComponent,
            },
        ],
    },

];

@NgModule({
    bootstrap: [CalendarLayoutComponent],
    providers: [{
        provide: dateHandlerToken,
        useClass: MockDateHandlerService
    }],
    declarations: [
        UpNavbarComponent,
        DayComponent,
        WeekComponent,
        CalendarLayoutComponent,
        BorderTimeFormatPipe,
        MonthFormatPipe,
        DayFormatPipe,
        BorderTimeFormatPipe,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CalendarLayoutModule {
}
