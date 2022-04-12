import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { TankModule } from 'src/app/core/components/tank/tank.module';
import { GameRoutingModule } from './game.routing.module';
import { GameConfig } from 'src/app/core/configs/game.config';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    TankModule,
    GameRoutingModule
  ],
  exports: [
    GameComponent
  ],
  providers: [GameConfig],
})
export class GameModule { }
