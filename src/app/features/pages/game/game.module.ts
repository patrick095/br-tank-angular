import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { TankModule } from 'src/app/core/components/tank/tank.module';
import { GameRoutingModule } from './game.routing.module';
import { GameConfig } from 'src/app/core/configs/game.config';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { StorageUtils } from 'src/app/core/utils/storage.utils';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    TankModule,
    GameRoutingModule,
    RouterModule
  ],
  exports: [
    GameComponent
  ],
  providers: [GameConfig, GameService, StorageUtils],
})
export class GameModule { }
