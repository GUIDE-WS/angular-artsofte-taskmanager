import { Priority } from './priority.enum';

/**
 * Класс задачи
 */
export class Task {
    private _name: string;

    // eslint-disable-next-line require-jsdoc
    public get name(): string {
        return this._name;
    }

    /**
     * @param {string} value Название задачи для замены
     */
    public set name(value: string) {
        this._name = value;
    }

    private _isCompleted: boolean;

    // eslint-disable-next-line require-jsdoc
    public get isCompleted(): boolean {
        return this._isCompleted;
    }

    /**
     * @param {boolean} value Булево значение выполненности задачи
     */
    public set isCompleted(value: boolean) {
        this._isCompleted = value;
    }

    private _description: string;

    // eslint-disable-next-line require-jsdoc
    public get description(): string {
        return this._description;
    }

    /**
     * @param {string} value Описание задачи
     */
    public set description(value: string) {
        this._description = value;
    }

    private _timeStart: Date | null;

    // eslint-disable-next-line require-jsdoc
    public get timeStart(): Date | null {
        return this._timeStart;
    }

    /**
     * @param {Date} value Время начала задачи
     */
    public set timeStart(value: Date | null) {
        this._timeStart = value;
    }

    private _timeEnd: Date | null;

    // eslint-disable-next-line require-jsdoc
    public get timeEnd(): Date | null {
        return this._timeEnd;
    }

    /**
     * @param {Date} value Время окончания задачи
     */
    public set timeEnd(value: Date | null) {
        this._timeEnd = value;
    }

    private _priority: Priority;

    // eslint-disable-next-line require-jsdoc
    public get priority(): Priority {
        return this._priority;
    }

    /**
     * @param {Priority} value Приоритет задачи
     */
    public set priority(value: Priority) {
        this._priority = value;
    }

    private _tag: string;

    // eslint-disable-next-line require-jsdoc
    public get tag(): string {
        return this._tag;
    }

    /**
     * Используется для группировки задач
     * @param {string} value тэг задачи
     */
    public set tag(value: string) {
        this._tag = value;
    }

    private _color: string;

    // eslint-disable-next-line require-jsdoc
    public get color(): string {
        return this._color;
    }

    /**
     * @param {string} value Цвет задачи в шестнадцатиричном формате
     */
    public set color(value: string) {
        this._color = value;
    }

    /**
     * @constructor
     * @param {string} name Название задачи. Обязательный параметр
     * @param {string} description Описание задачи. По умолчанию пустая строка
     * @param {Date} timeStart Время начала задачи. По умолчанию null
     * @param {Date} timeEnd Время окончания задачи. По умолчанию null
     * @param {Priority} priority Приоритет задачи. По умолчанию null
     * @param {string} tag Тэг задачи. По умолчанию пустая строка
     * @param {string} color Цвет задачи в hex формате. По умолчанию серый
     */
    constructor(
        name: string,
        description: string = '',
        timeStart?: Date,
        timeEnd?: Date,
        priority: Priority = Priority.none,
        tag: string = '',
        color: string = '#808080',
    ) {
        this._name = name;
        this._description = description;
        this._isCompleted = false;
        this._timeStart = timeStart ? timeStart : null;
        this._timeEnd = timeEnd ? timeEnd : null;
        this._priority = priority;
        this._tag = tag;
        this._color = color;
    }
}

