import { Component, Input, OnInit } from '@angular/core';
import { GameConfig } from '../../configs/game.config';
import { GameStartInterface } from '../../interfaces/game.interface';
import { positionInterface } from '../../interfaces/player.interface';

@Component({
  selector: 'app-projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.scss']
})
export class ProjectileComponent implements OnInit {
  @Input() public position: positionInterface;
  @Input() public game: GameStartInterface;
  @Input() public angle: number = 0;
  @Input() public power: number = 0;
  public absLeft: number = 0;
  public absRight: number = 0;
  public bottom: number = 20;
  public shooting: boolean;
  public relLeft = 0;
  private gravity = 100;
  private timeInAir = 0;
  private windXVelocity: number = 0;
  private windYVelocity: number = 0;
  private yVelocity: number = 0;
  private xVelocity: number = 0;

  constructor(private config: GameConfig) {
    this.game = {
      isMyTurn: false,
      players: [],
      turn: 0,
      wind: {
        angle: 0,
        speed: 0
      }
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.shooting = false;
    this.absLeft = this.position.x + this.config.TankSize;
    this.absRight = this.absLeft + 20;
  }

  ngOnInit(): void {
  }

  public fire(power: number) {
    this.resetProjectile()
    this.power = power;
    this.shooting = true;
    this.windYVelocity = Math.sin(this.game.wind.angle * Math.PI/180) * this.game.wind.speed;
    this.windXVelocity = Math.cos(this.game.wind.angle * Math.PI/180) * this.game.wind.speed;
    this.yVelocity = Math.sin(this.angle) * this.power + this.windYVelocity;
    this.xVelocity = Math.cos(this.angle) * this.power + this.windXVelocity;
    window.requestAnimationFrame(this.bothMovement.bind(this));
  }

  public resetProjectile() {
    this.power = 0;
    this.bottom = 20;
    this.absLeft = this.position.x + this.config.TankSize;
    this.absRight = this.absLeft + 20;
    this.timeInAir = 0;
    this.relLeft = 0;
  }

  private updateProjectile() {
    this.gravity = 100*(this.timeInAir);
    this.bottom += (this.yVelocity - this.gravity);
    this.relLeft += this.xVelocity;
    this.absLeft = this.position.x + this.relLeft;
    this.absRight = this.absLeft + 20;
    this.shooting = this.bottom > -20;
  }

  private checkCollision() {
    return this.bottom > -20;
  }

  private bothMovement() {
    // if (this.checkCollision()) {
    //   this.proj.remove()
    //   if (this.gun.tank.hp === 0) {
    //     this.gun.tank.game.endGame()
    //   } else if (this.gun.tank.enemyTank.hp === 0) {
    //     this.gun.tank.game.endGame()
    //   } else {
    //     this.gun.tank.game.counter = 0
    //   }
    // } else {
    if (this.shooting) {
      this.updateProjectile();
      this.timeInAir += 1/60;
      window.requestAnimationFrame(this.bothMovement.bind(this));
    }
  }

}
