import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { GameService } from 'src/app/features/services/game.service';
import { StorageUtils } from '../../utils/storage.utils';



@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoomComponent
  ],
  providers: [
    GameService,
    StorageUtils
  ]
})
export class RoomModule { }
