import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInModel } from '../models/sign-in.model';

export class SignInFormViewModel {
    public form: FormGroup = new FormGroup({
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userPassword: new FormControl('', Validators.required),
    });

    public toModel(): SignInModel {
        const model: SignInModel = new SignInModel();
        model.email = this.form.controls['userEmail'].value;
        model.password = this.form.controls['userPassword'].value;

        return model;
    }
}
