import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import SigninForm from './signin.form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public form: FormGroup

  constructor(private signinForm: SigninForm, private service: GameService, private router: Router) {
    this.form = this.signinForm.form;
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.service.newGame(this.signinForm.user).subscribe((response) => {
      if(response) {
        this.router.navigate(['/game']);
      }
    });
  }

}
