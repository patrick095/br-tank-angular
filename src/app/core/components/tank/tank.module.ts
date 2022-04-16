import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TankComponent } from './tank.component';
import { GunModule } from '../gun/gun.module';
import { GameService } from 'src/app/features/services/game.service';
import { StorageUtils } from '../../utils/storage.utils';



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
  ],
  providers: [GameService, StorageUtils],
})
export class TankModule { }
