import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GameConfig } from '../../configs/game.config';
import { GameStartInterface, GunShootInterface } from '../../interfaces/game.interface';
import { positionInterface } from '../../interfaces/player.interface';
import { ProjectileComponent } from '../projectile/projectile.component';

@Component({
  selector: 'app-gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.scss']
})
export class GunComponent implements OnInit {
  @ViewChild(ProjectileComponent) Projectile?:ProjectileComponent;
  @Input() public angle: number;
  @Input() public game?: GameStartInterface;
  public tankSize: number;
  public power: number = 0;
  constructor(private config: GameConfig) {
    this.tankSize = this.config.TankSize;
    this.angle = 0;
   }

  ngOnInit(): void {
  }

  public shoot(data: GunShootInterface): void {
    if (this.Projectile) {
      this.Projectile.fire(data);
    }
  }

}
