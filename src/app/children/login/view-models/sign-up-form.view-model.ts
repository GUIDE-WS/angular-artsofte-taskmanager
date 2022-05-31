import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpModel } from '../models/sign-up-model';

export class SignUpFormViewModel {
    public form: FormGroup = new FormGroup({
        userNickName: new FormControl('', Validators.required),
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userPassword: new FormControl('', Validators.required)
    });

    public toModel(): SignUpModel {
        const model: SignUpModel = new SignUpModel();
        model.nickName = this.form.controls['userNickName'].value;
        model.email = this.form.controls['userEmail'].value;
        model.password = this.form.controls['userPassword'].value;

        return model;
    }
}
