import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankComponent } from './tank.component';
import { GunModule } from '../gun/gun.module';



@NgModule({
  declarations: [
    TankComponent
  ],
  imports: [
    CommonModule,
    GunModule
  ],
  exports: [
    TankComponent
  ]
})
export class TankModule { }
