import {
    AfterViewInit,
    Component,
    ElementRef, EventEmitter, HostListener, Output,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-color-slider',
    templateUrl: './color-slider.component.html',
    styleUrls: ['./color-slider.component.css'],
})
export class ColorSliderComponent implements AfterViewInit {
    @Output()
    public hue: EventEmitter<string> = new EventEmitter();

    @ViewChild('canvas')
    private _canvas: ElementRef<HTMLCanvasElement>;


    private _canvasContext: CanvasRenderingContext2D;
    private _mousedown: boolean = false;
    private _selectedHeight: number = 0;

    constructor() {
    }


    public draw(): void {
        if (!this._canvasContext) {
            this._canvasContext = this._canvas.nativeElement.getContext('2d') ?? new CanvasRenderingContext2D();
        }

        const width: number = this._canvas.nativeElement.width;
        const height: number = this._canvas.nativeElement.height;
        this._canvasContext.clearRect(0, 0, width, height);

        const gradient: CanvasGradient = this._canvasContext.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        this._canvasContext.beginPath();
        this._canvasContext.rect(0, 0, width, height);
        this._canvasContext.fillStyle = gradient;
        this._canvasContext.fill();
        this._canvasContext.closePath();

        if (this._selectedHeight) {
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = 'white';
            this._canvasContext.lineWidth = 5;
            this._canvasContext.rect(0, this._selectedHeight - 5, width, 10);
            this._canvasContext.stroke();
            this._canvasContext.closePath();
        }
    }

    public ngAfterViewInit(): void {
        this.draw();
    }

    @HostListener('window:mouseup', ['$event'])
    public onMouseUp(event: MouseEvent): void {
        this._mousedown = false;
    }

    public onMouseDown(event: MouseEvent): void {
        this._mousedown = true;
        this._selectedHeight = event.offsetY;
        this.draw();
        this.emitColor(event.offsetX, event.offsetY);
    }

    public onMouseMove(event: MouseEvent): void {
        if (this._mousedown) {
            this._selectedHeight = event.offsetY;
            this.draw();
            this.emitColor(event.offsetX, event.offsetY);
        }
    }

    public emitColor(x: number, y: number): void {
        const rgbaColor: string = this.getColorAtPosition(x, y);
        this.hue.emit(rgbaColor);
    }

    public getColorAtPosition(x: number, y: number): string {
        const imageData: Uint8ClampedArray = this._canvasContext.getImageData(x, y, 1, 1).data;

        return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
    }
}
