import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../classes/player.class';
import { playerInterface } from '../../interfaces/player.interface';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss']
})
export class TankComponent implements OnInit {
  @Input() enemy: playerInterface;
  @Input() player: playerInterface;
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
  }

  public lowerGunAngle(): void {
    this.gunAngle -= 1;
  }
}
