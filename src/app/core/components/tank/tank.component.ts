import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../classes/player.class';
import { GameStartInterface } from '../../interfaces/game.interface';
import { playerInterface } from '../../interfaces/player.interface';
import { GunComponent } from '../gun/gun.component';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss']
})
export class TankComponent implements OnInit {
  @ViewChild(GunComponent) Gun?:GunComponent;
  @Input() enemy: playerInterface;
  @Input() player: playerInterface;
  @Input() game?: GameStartInterface;
  @Output() angle: EventEmitter<number> = new EventEmitter<number>();
  public gunAngle: number;

  constructor() { 
    this.player = new Player('', 0, '');
    this.enemy = new Player('', 1, '');
    this.gunAngle = 0;
  }

  ngOnInit(): void {
  }

  public moveLeft(): void {
    this.player.position.x -= 1;
  }

  public moveRight(): void {
    this.player.position.x += 1;
  }

  public upperGunAngle(): void {
    this.gunAngle += 1;
    this.angle.next(this.gunAngle);
  }

  public lowerGunAngle(): void {
    this.gunAngle -= 1;
    this.angle.next(this.gunAngle);
  }
}
