import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ColorPickerComponent,
} from './components/color-picker/color-picker.component';
import {
    ColorPaletteComponent,
} from './components/color-palette/color-palette.component';
import {
    ColorSliderComponent
} from './components/color-slider/color-slider.component';


@NgModule({
    bootstrap: [ColorPickerComponent],
    declarations: [
        ColorPickerComponent,
        ColorPaletteComponent,
        ColorSliderComponent,
    ],

    imports: [
        CommonModule,
    ],
    exports: [
        ColorPickerComponent
    ]
})
export class ColorPickerModule {
}
