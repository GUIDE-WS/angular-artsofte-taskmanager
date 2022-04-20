import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    LeftNavbarComponent,
} from './components/left-navbar/left-navbar.component';
import {
    HomeLayoutComponent,
} from './components/home-layout/home-layout.component';
import { RouterModule, Routes } from '@angular/router';
import {
    CalendarLayoutModule,
} from './children/calendar-layout/calendar-layout.module';
import {
    KanbanDeskComponent,
} from './components/kanban-desk/kanban-desk.component';

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: 'calendar',
                loadChildren: (): Promise<CalendarLayoutModule> => import('./children/calendar-layout/calendar-layout.module')
                    .then((m: any) => m.CalendarLayoutModule),
            },
            {
                path: 'kanban-desk',
                component: KanbanDeskComponent,
            },
        ],
    },
];

@NgModule({
    bootstrap: [
        HomeLayoutComponent,
    ],
    declarations: [
        LeftNavbarComponent,
        HomeLayoutComponent,
        KanbanDeskComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],

    exports: [
        RouterModule,
    ],
})
export class HomeLayoutModule {

}
