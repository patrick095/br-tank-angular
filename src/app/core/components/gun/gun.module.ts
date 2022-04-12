import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GunComponent } from './gun.component';
import { ProjectileModule } from '../projectile/projectile.module';



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
  ]
})
export class GunModule { }
