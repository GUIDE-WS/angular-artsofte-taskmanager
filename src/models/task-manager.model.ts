import { User } from './user.model';
import { Task } from './task.model';
import { IUserSelector } from './user-selector.model.interface';
import { ITasksSelector } from './tasks-selector.model.interface';

/**
 * Модель таск менеджера
 */
export class TaskManager {
    private static _instance: TaskManager;

    // eslint-disable-next-line valid-jsdoc
    /**
     *
     * @param {IUserSelector} userSelector
     * @param {ITasksSelector} taskSelector
     * @param {string} email
     */
    public static getInstance(
        userSelector: IUserSelector,
        taskSelector: ITasksSelector,
        email: string,
    ): TaskManager {
        if (this._instance === null) {
            this._instance = new TaskManager(userSelector, taskSelector, email);
        }

        return this._instance;
    }

    private readonly _user: User;
    private _tasks: Task[];

    /**
     *
     */
    public get tasks(): Task[] {
        return this._tasks;
    }

    /**
     * @private
     * @param {IUserSelector} userSelector
     * @param {ITasksSelector} taskSelector
     * @param {string} email
     */
    private constructor(
        userSelector: IUserSelector,
        taskSelector: ITasksSelector,
        email: string,
    ) {
        this._user = userSelector.selectUser(email);
        this._tasks = taskSelector.selectTasks(this._user);
    }

    /**
     * Выполнить задачу по id
     * @param {number} taskId id задачи
     */
    public completeTask(taskId: number) : void {
        const currentTask : Task = this._tasks[taskId];
        if (currentTask && !currentTask.isCompleted) {
            currentTask.isCompleted = true;
        }
    }

    /**
     * Добавить новую задачу в список
     * @param {Task} newTask
     */
    public addTask(newTask: Task): void {
        if (!newTask) {
            return;
        }
        this._tasks.push(newTask);
    }
}
