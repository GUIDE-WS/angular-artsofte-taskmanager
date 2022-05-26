import { Priority } from './priority.enum';
import { ITask } from '../interfaces/task.interface';

/**
 * Класс задачи
 */
export class Task implements ITask{
    public id: string = '0';
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
     * @param {ITask} data данные задачи
     */
    constructor(data: ITask) {
        this.name = data.name;
        this.description = data.description;
        this.timeStart = data.timeStart;
        this.timeEnd = data.timeEnd;
        this.priority = data.priority;
        this.tag = data.tag;
        this.color = data.color;
    }
}

