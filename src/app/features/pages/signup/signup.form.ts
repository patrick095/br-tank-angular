import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export default class SignupForm {
  public signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
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

  public get name(): string {
    return this.signinForm.get('name')?.value;
  }

  public set name(value: string) {
    this.signinForm.get('name')?.setValue(value);
  }

  public get email(): string {
    return this.signinForm.get('email')?.value;
  }

  public set email(value: string) {
    this.signinForm.get('email')?.setValue(value);
  }

  public get isValid(): boolean {
    return this.signinForm.valid;
  }

  public getData() {
    return {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
    };
  }
}
