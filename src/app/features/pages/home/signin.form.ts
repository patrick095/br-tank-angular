import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export default class SigninForm {
  public signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public get form(): FormGroup {
    return this.signinForm;
  }

  public get username(): string {
    return this.signinForm.get('username')?.value;
  }

  public set username(value: string) {
    this.signinForm.get('username')?.setValue(value);
  }

  public get password(): string {
    return this.signinForm.get('password')?.value;
  }

  public set password(value: string) {
    this.signinForm.get('password')?.setValue(value);
  }

  public get isValid(): boolean {
    return this.signinForm.valid;
  }

  public getData() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
