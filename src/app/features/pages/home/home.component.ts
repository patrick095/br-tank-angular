import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import SigninForm from './signin.form';
import { StorageUtils } from '../../../core/utils/storage.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private signinForm: SigninForm,
    private service: GameService,
    private router: Router,
    private userService: UserService,
    private storage: StorageUtils
  ) {
    this.form = this.signinForm.form;
  }

  ngOnInit(): void {
    if (this.storage.getStorage('user')) {
      this.router.navigate(['/dash']);
    }
  }

  public onSubmit(): void {
    this.userService.signin(this.signinForm.getData())
    .subscribe((user) => {
      if (user) {
        this.storage.setStorage('user', user);
        this.router.navigate(['/dash']);
      }
    })
  }
}
