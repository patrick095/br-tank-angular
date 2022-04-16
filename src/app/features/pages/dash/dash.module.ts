import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { DashRoutingModule } from './dash.routing.module';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { HallModule } from 'src/app/core/components/hall/hall.module';
import { RoomModule } from 'src/app/core/components/room/room.module';



@NgModule({
  declarations: [
    DashComponent
  ],
  imports: [
    CommonModule, DashRoutingModule, RouterModule, HallModule, RoomModule
  ],
  exports: [
    DashComponent
  ],
  providers: [StorageUtils, GameService],
})
export class DashModule { }
