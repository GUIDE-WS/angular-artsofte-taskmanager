import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../interfaces/task.interface';
import { formatDate } from '@angular/common';

export class TaskFormViewModel {
    public taskID: string = '';
    public taskColor: string;
    public isCompleted: boolean = false;

    public form: FormGroup = new FormGroup({
        taskName: new FormControl(''),
        taskDescription: new FormControl(''),
        taskTimeStart: new FormControl('', Validators.required),
        taskTimeEnd: new FormControl('', Validators.required),
        taskPriority: new FormControl(''),
        taskTag: new FormControl(''),
    });

    public toModel(): ITask {
        return {
            id: this.taskID,
            name: this.form.controls['taskName'].value,
            description: this.form.controls['taskDescription'].value,
            timeStart: new Date(this.form.controls['taskTimeStart'].value),
            timeEnd: new Date(this.form.controls['taskTimeEnd'].value),
            priority: this.form.controls['taskPriority'].value,
            tag: this.form.controls['taskTag'].value,
            color: this.taskColor,
            isCompleted: this.isCompleted,
        };
    }

    public fromModel(model: ITask): void {
        this.taskID = model.id;
        this.form.controls['taskName'].setValue(model.name);
        this.form.controls['taskDescription'].setValue(model.description);
        this.form.controls['taskTimeStart'].setValue(formatDate(model.timeStart??'','yyyy-MM-ddThh:mm', 'en'));
        this.form.controls['taskTimeEnd'].setValue(formatDate(model.timeEnd??'','yyyy-MM-ddThh:mm', 'en'));
        this.form.controls['taskPriority'].setValue(model.priority);
        this.form.controls['taskTag'].setValue(model.tag);
        this.taskColor = model.color;
        this.isCompleted = model.isCompleted;
    }
}
