import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectileComponent } from './projectile.component';
import { GameConfig } from '../../configs/game.config';



@NgModule({
  declarations: [
    ProjectileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProjectileComponent
  ],
  providers: [GameConfig],
})
export class ProjectileModule { }
