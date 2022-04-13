import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GunComponent } from './gun.component';
import { ProjectileModule } from '../projectile/projectile.module';
import { GameConfig } from '../../configs/game.config';



@NgModule({
  declarations: [
    GunComponent
  ],
  imports: [
    CommonModule,
    ProjectileModule
  ],
  exports: [
    GunComponent
  ],
  providers: [GameConfig],
})
export class GunModule { }
