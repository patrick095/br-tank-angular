import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../classes/player.class';
import { GameConfig } from '../../configs/game.config';
import {
  gameInterface,
  GunShootInterface,
} from '../../interfaces/game.interface';
import { positionInterface } from '../../interfaces/player.interface';

@Component({
  selector: 'app-projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.scss'],
})
export class ProjectileComponent implements OnInit {
  @Input() public game: gameInterface;
  public position: positionInterface;
  public gunAngle: number = 0;
  public power: number = 0;
  public absLeft: number = 0;
  public absRight: number = 0;
  public bottom: number = 20;
  public shooting: boolean;
  public relLeft = 0;
  public angle: number = 0;
  private timeInAir = 0;
  private yVelocity: number = 0;
  private xVelocity: number = 0;
  private windSide?: 'left' | 'right';
  private enemyPosition: positionInterface;
  private userId: string = '';
  private enemyId: string = '';

  constructor(private config: GameConfig) {
    this.game = {
      players: [],
      turn: 0,
      wind: {
        angle: 0,
        speed: 0,
      },
      _id: '',
      countdown: 0,
      playerTurn: '',
      winner: new Player('', 0, ''),
    };
    this.position = {
      x: 0,
      y: 0,
    };
    this.enemyPosition = {
      x: 0,
      y: 0,
    };
    this.shooting = false;
  }

  ngOnInit(): void {}

  public fire(gunShoot: GunShootInterface) {
    const { power, angle, playerPosition, enemyPosition, enemyId, playerId } =
      gunShoot;

    this.position = playerPosition;
    this.enemyPosition = enemyPosition;
    this.userId = playerId;
    this.enemyId = enemyId;
    this.angle = (Math.PI * (90 - angle)) / 180;
    this.shooting = true;

    this.resetProjectile();

    this.power = power;

    this.calculateWind();
    requestAnimationFrame(this.bothMovement.bind(this));
  }

  private setAbsPosition() {
    this.absLeft = this.position.x + this.config.TankSize + this.relLeft;
    this.absRight = this.absLeft + 20;
  }

  private calculateWind(): void {
    this.windSide = this.game.wind.angle > 90 ? 'left' : 'right';
    const windYVelocity =
      Math.sin((this.game.wind.angle * Math.PI) / 180) * this.game.wind.speed;
    const windXVelocity =
      Math.cos((this.game.wind.angle * Math.PI) / 180) * this.game.wind.speed;
    this.yVelocity = Math.sin(this.angle) * this.power + windYVelocity;
    this.xVelocity = Math.cos(this.angle) * this.power + windXVelocity;
  }

  private resetProjectile() {
    this.power = 0;
    this.bottom = 20;
    this.setAbsPosition();
    this.timeInAir = 0;
    this.relLeft = 0;
  }

  private updateProjectile() {
    this.timeInAir += 1 / 60;
    const gravity = 15 * this.timeInAir;
    this.bottom += this.yVelocity - gravity;
    this.relLeft += this.xVelocity;
    this.setAbsPosition();
    this.shooting = !this.checkCollision();
  }

  private checkCollision() {
    let isColision = false;

    const colisionWithMe = this.checkHitPlayer(this.position);
    const colisionWithEnemy = this.checkHitPlayer(this.enemyPosition);

    if (colisionWithMe) {
      isColision = true;
      this.animateHit(this.userId);
    } else if (colisionWithEnemy) {
      isColision = true;
      this.animateHit(this.enemyId);
    } else {
      isColision = this.bottom <= -20;
    }
    return isColision;
  }

  private animateHit(id: string): void {
    const status = document.getElementById('status');
    const player = document.getElementById(id);
    status?.classList.add('hitPlayer');
    player?.classList.add('hitPlayer');
    setTimeout(() => {
      status?.classList.remove('hitPlayer');
      player?.classList.remove('hitPlayer');
    }, 1500);
  }

  private checkHitPlayer(playerPosition: positionInterface): boolean {
    const absLeftPlayer = playerPosition.x;
    const absRightPlayer = absLeftPlayer + 40;

    return (
      (this.absLeft >= absLeftPlayer &&
        this.absLeft <= absRightPlayer &&
        this.bottom <= 0) ||
      (this.absRight <= absRightPlayer &&
        this.absRight >= absLeftPlayer &&
        this.bottom <= 0)
    );
  }

  private bothMovement() {
    if (this.shooting) {
      this.updateProjectile();
      requestAnimationFrame(this.bothMovement.bind(this));
    }
  }
}
