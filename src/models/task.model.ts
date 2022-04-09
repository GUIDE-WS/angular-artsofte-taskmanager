import { Priority } from './priority.enum';
import { ITask } from './task.model.interface';

/**
 * Класс задачи
 */
export class Task implements ITask{
    public name: string;
    public isCompleted: boolean = false;
    public description: string = '';
    public timeStart: Date | null = null;
    public timeEnd: Date | null = null;
    public priority: Priority = Priority.none;
    public tag: string = '';
    public color: string = '#808080';

    /**
     * @constructor
     * @param {string} name Название задачи. Обязательный параметр
     */
    constructor(name: string) {
        this.name = name;
    }
}

