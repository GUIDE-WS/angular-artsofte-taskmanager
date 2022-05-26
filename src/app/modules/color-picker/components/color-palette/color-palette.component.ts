import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Input,
    Output,
    SimpleChanges,
    OnChanges,
    EventEmitter,
    HostListener,
} from '@angular/core';

@Component({
    selector: 'app-color-palette',
    templateUrl: './color-palette.component.html',
    styleUrls: ['./color-palette.component.css'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {
    public selectedPosition: { x: number; y: number };

    @Input()
    public hue: string;

    @Output()
    public color: EventEmitter<string> = new EventEmitter(true);

    @ViewChild('canvas')
    private _canvas: ElementRef<HTMLCanvasElement>;

    private _canvasContext: CanvasRenderingContext2D;
    private _mousedown: boolean = false;


    public ngAfterViewInit(): void {
        this.draw();
    }

    public draw(): void {
        if (!this._canvas) {
            return;
        }
        if (!this._canvasContext) {
            this._canvasContext = this._canvas.nativeElement.getContext('2d') ?? new CanvasRenderingContext2D();
        }
        const width: number = this._canvas.nativeElement.width;
        const height: number = this._canvas.nativeElement.height;

        this._canvasContext.fillStyle = this.hue || 'rgba(255,255,255,1)';
        this._canvasContext.fillRect(0, 0, width, height);

        const whiteGrad: CanvasGradient = this._canvasContext.createLinearGradient(0, 0, width, 0);
        whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
        whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');

        this._canvasContext.fillStyle = whiteGrad;
        this._canvasContext.fillRect(0, 0, width, height);

        const blackGrad: CanvasGradient = this._canvasContext.createLinearGradient(0, 0, 0, height);
        blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
        blackGrad.addColorStop(1, 'rgba(0,0,0,1)');

        this._canvasContext.fillStyle = blackGrad;
        this._canvasContext.fillRect(0, 0, width, height);

        if (this.selectedPosition) {
            this._canvasContext.strokeStyle = 'white';
            this._canvasContext.fillStyle = 'white';
            this._canvasContext.beginPath();
            this._canvasContext.arc(
                this.selectedPosition.x,
                this.selectedPosition.y,
                10,
                0,
                2 * Math.PI,
            );
            this._canvasContext.lineWidth = 5;
            this._canvasContext.stroke();
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['hue']) {
            this.draw();
            const position: { x: number; y: number } = this.selectedPosition;
            if (position) {
                this.color.emit(this.getColorAtPosition(position.x, position.y));
            }
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public onMouseUp(evt: MouseEvent): void {
        this._mousedown = false;
    }

    public onMouseDown(evt: MouseEvent): void {
        this._mousedown = true;
        this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
        this.draw();
        this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY));
    }

    public onMouseMove(evt: MouseEvent): void {
        if (this._mousedown) {
            this.selectedPosition = { x: evt.offsetX, y: evt.offsetY };
            this.draw();
            this.emitColor(evt.offsetX, evt.offsetY);
        }
    }

    public emitColor(x: number, y: number): void {
        const rgbaColor: string = this.getColorAtPosition(x, y);
        this.color.emit(rgbaColor);
    }

    public getColorAtPosition(x: number, y: number): string {
        const imageData: Uint8ClampedArray = this._canvasContext.getImageData(x, y, 1, 1).data;

        return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]},1)`;
    }
}
