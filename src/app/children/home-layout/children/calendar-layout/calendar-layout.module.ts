import { NgModule } from '@angular/core';
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
    declarations: [
        UpNavbarComponent,
        DayComponent,
        WeekComponent,
        CalendarLayoutComponent,
        MonthFormatPipe,
        DayFormatPipe,
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
