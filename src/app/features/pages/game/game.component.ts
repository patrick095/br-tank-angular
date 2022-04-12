import { Component, HostListener, OnInit } from '@angular/core';
import { Player } from 'src/app/core/classes/player.class';
import { GameConfig } from 'src/app/core/configs/game.config';
import { WindEnum } from 'src/app/core/enums/wind.enum';
import { playerInterface } from 'src/app/core/interfaces/player.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public players: Array<playerInterface>;
  public enemy: any;
  public maxPower: number;
  public turn: number;
  public counter: number;
  public windAngle: number;
  public windSpeed: number;
  public power: number;
  public lastShot: number;
  public myTurn: boolean;
  private isSpaceBarPressed: boolean;
  private interval?: number;

  @HostListener('document:keypress', ['$event'])
  handleKeyPressEvent(e: KeyboardEvent) {
    this.pressKey(e);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(e: KeyboardEvent) {
    this.keyUp(e);
  }

  constructor(private config: GameConfig) {
    this.players = [];
    this.enemy = {};
    this.isSpaceBarPressed = false;
    this.maxPower = this.config.MaxPower;
    this.turn = 0;
    this.windAngle = 0;
    this.windSpeed = 0;
    this.power = 0;
    this.lastShot = 0;
    this.counter = this.config.CountDown;
    this.myTurn = false;
  }

  ngOnInit(): void {
    this.startGame();
  }

  public startGame(): void {
    this.players = [
      new Player('player 1', 0, 'red'),
      new Player('player 2', 1, 'green'),
    ];
    this.startTurn();
  }

  private setWind(): void {
    this.windAngle =
      Math.round(Math.random()) === 0 ? WindEnum.LEFT : WindEnum.RIGHT;
    this.windSpeed = parseFloat(
      (Math.random() * this.config.MaxWindSpeed).toFixed(1)
    );
  }

  private setMyTurn(): void {
    this.myTurn = this.turn % 2 === 0;
  }

  private nextTurn(): void {
    this.turn += 1;
    this.counter = this.config.CountDown;
    this.startTurn();
  }

  private startTurn(): void {
    this.setWind();
    this.setMyTurn();
    this.interval = window.setInterval(() => {
      this.countDown();
      if (this.counter === 0) {
        clearInterval(this.interval);
        this.nextTurn();
      }
    }, 1000);
  }

  public commandTank(e: KeyboardEvent): void {
    // if (e.which === 37) {
    //   this.playerTurn.moveTankLeft()
    // } else if (e.which === 39) {
    //   this.playerTurn.moveTankRight()
    // } else if (e.which === 38) {
    //   this.playerTurn.gun.rotateGunRight()
    // } else if (e.which === 40) {
    //   this.playerTurn.gun.rotateGunLeft()
    // }
  }

  public pressKey(e: KeyboardEvent): void {
    if (e.code === 'Space' && this.myTurn) {
      if (this.power < this.maxPower && this.power >= 0) {
        this.power += 1;
      }
    }
  }

  public keyUp(e: KeyboardEvent): void {
    if (e.code === 'Space' && this.myTurn) {
      // this.playerTurn.gun.shoot(this.power)
      this.lastShot = this.power;
      this.power = 0;
      clearInterval(this.interval);
      this.nextTurn();
    }
  }

  private countDown(): void {
    this.counter > 0 ? (this.counter -= 1) : (this.counter = 0);
  }
}
