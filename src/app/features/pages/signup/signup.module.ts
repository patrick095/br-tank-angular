import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import SignupForm from './signup.form';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SignupComponent
  ],
  providers: [
    UserService,
    StorageUtils,
    SignupForm
  ],
})
export class SignupModule { }
