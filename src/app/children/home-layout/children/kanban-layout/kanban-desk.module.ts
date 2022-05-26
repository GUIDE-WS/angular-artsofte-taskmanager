import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    KanbanLayoutComponent,
} from './components/kanban-layout/kanban-layout.component';
import {
    KanbanDeskComponent,
} from './components/kanban-desk/kanban-desk.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: KanbanLayoutComponent,
    }
];

@NgModule({
    declarations: [
        KanbanLayoutComponent,
        KanbanDeskComponent,
    ],

    imports: [
        RouterModule.forChild(routes),
        CommonModule,
    ],
    exports: [
        RouterModule
    ],
})
export class KanbanDeskModule {
}
