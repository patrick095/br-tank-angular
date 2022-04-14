import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export default class SigninForm {
  public signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public get form(): FormGroup {
    return this.signinForm;
  }

  public get user(): string {
    return this.signinForm.get('user')?.value;
  }

  public set user(value: string) {
    this.signinForm.get('user')?.setValue(value);
  }
}
