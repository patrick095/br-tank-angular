import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GameService } from 'src/app/features/services/game.service';
import { Player } from '../../classes/player.class';
import { gameInterface } from '../../interfaces/game.interface';
import { playerInterface } from '../../interfaces/player.interface';
import { userInterface } from '../../interfaces/user.interface';
import { StorageUtils } from '../../utils/storage.utils';
import { GunComponent } from '../gun/gun.component';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss']
})
export class TankComponent implements OnInit {
  @ViewChild(GunComponent) Gun?:GunComponent;
  @Input() player: playerInterface;
  @Input() game?: gameInterface;

  constructor(private gameService: GameService, private storage: StorageUtils) { 
    this.player = new Player('', 0, '');
  }

  ngOnInit(): void {
    this.player.angle = 0;
  }

  public moveLeft(): void {
    this.player.position.x -= 1;
    this.sendChange();
  }

  public moveRight(): void {
    this.player.position.x += 1;
    this.sendChange();
  }

  public upperGunAngle(): void {
    this.player.angle += 1;
    this.sendChange();
  }

  public lowerGunAngle(): void {
    this.player.angle += 1;
    this.sendChange();
  }

  private sendChange(): void {
    if (this.game) {
      console.log(this.player.angle)
      this.gameService.movePlayer(this.player, this.game?._id);
    }
  }
}
