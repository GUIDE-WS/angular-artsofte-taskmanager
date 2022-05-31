import { InjectionToken, NgModule } from '@angular/core';
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
import { KanbanDeskModule } from './children/kanban-layout/kanban-desk.module';
import { MockTaskSelectorService } from './services/mock-task-selector.service';
import { MockTaskFactoryService } from './services/mock-task-factory.service';
import {
    TaskHandleComponent,
} from './components/task-handler/task-handle.component';
import {
    BackRouteButtonDirective,
} from './directives/back-route-button.directive';
import { ReactiveFormsModule } from '@angular/forms';
import {
    ColorPickerModule,
} from '../../modules/color-picker/color-picker.module';
import { MockTaskEditorService } from './services/mock-task-editor.service';
import { ModalConfirmDirective } from './directives/modal-confirm.directive';
import { ModalConfirmDialogComponent } from './components/modal-confirm-dialog/modal-confirm-dialog.component';

export const taskSelectorToken: InjectionToken<string> = new InjectionToken<string>('Task selector service');
export const taskFactoryToken: InjectionToken<string> = new InjectionToken<string>('Task factory service');
export const taskEditorToken: InjectionToken<string> = new InjectionToken<string>('Task editor service');
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
                loadChildren: (): Promise<KanbanDeskModule> => import('./children/kanban-layout/kanban-desk.module')
                    .then((m: any) => m.KanbanDeskModule),
            },
        ],
    },
    {
        path: 'edit-task/:id',
        data: { isEditMode: true },
        component: TaskHandleComponent,
    },
    {
        path: 'new-task',
        data: { isEditMode: false },
        component: TaskHandleComponent,
    },
];

@NgModule({
    bootstrap: [
        HomeLayoutComponent,
    ],
    declarations: [
        LeftNavbarComponent,
        HomeLayoutComponent,
        TaskHandleComponent,
        BackRouteButtonDirective,
        ModalConfirmDirective,
        ModalConfirmDialogComponent,
    ],
    providers: [
        {
            provide: taskEditorToken,
            useClass: MockTaskEditorService
        },
        {
            provide: taskSelectorToken,
            useClass: MockTaskSelectorService
        },
        {
            provide: taskFactoryToken,
            useClass: MockTaskFactoryService
        },
    ],
    imports: [
        ColorPickerModule,
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class HomeLayoutModule {

}
