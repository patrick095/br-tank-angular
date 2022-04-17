import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import { UserService } from '../../services/user.service';
import SignupForm from './signup.form';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private signupForm: SignupForm, private userService: UserService, private storage: StorageUtils, private router: Router) { 
    this.form = this.signupForm.form;
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.userService.signup(this.signupForm.getData())
    .subscribe((user) => {
      if (user) {
        this.storage.setStorage('user', user);
        this.router.navigate(['/dash']);
      }
    })
  }
}
