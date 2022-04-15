import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import SigninForm from './signin.form';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { GameConfig } from 'src/app/core/configs/game.config';
import { UserService } from '../../services/user.service';
import { StorageUtils } from 'src/app/core/utils/storage.utils';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule, RouterModule],
  exports: [HomeComponent],
  providers: [SigninForm, GameService, GameConfig, UserService, StorageUtils],
})
export class HomeModule {}
