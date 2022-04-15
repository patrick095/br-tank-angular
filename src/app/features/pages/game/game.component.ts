import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Player } from 'src/app/core/classes/player.class';
import { TankComponent } from 'src/app/core/components/tank/tank.component';
import { GameConfig } from 'src/app/core/configs/game.config';
import { WindEnum } from 'src/app/core/enums/wind.enum';
import { GameStartInterface } from 'src/app/core/interfaces/game.interface';
import { playerInterface } from 'src/app/core/interfaces/player.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild(TankComponent) Tank?:TankComponent;
  public players: Array<playerInterface>;
  public maxPower: number;
  public turn: number;
  public counter: number;
  public windAngle: number;
  public windSpeed: number;
  public power: number;
  public lastShot: number;
  public myTurn: boolean;
  public gunAngle: number;
  public gameData?: GameStartInterface;
  private interval?: number;

  @HostListener('document:keydown', ['$event'])
  handleKeyPressEvent(e: KeyboardEvent) {
    this.keydown(e);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(e: KeyboardEvent) {
    this.keyUp(e);
  }

  constructor(private config: GameConfig, private server: GameService) {
    this.players = [];
    this.maxPower = this.config.MaxPower;
    this.turn = 0;
    this.windAngle = 0;
    this.windSpeed = 0;
    this.power = 0;
    this.lastShot = 0;
    this.counter = this.config.CountDown;
    this.myTurn = false;
    this.gunAngle = 0;
  }

  ngOnInit(): void {
    this.startGame();
  }

  public startGame(): void {
    this.server.startGame().subscribe((data) => {
      this.gameData = data;
      this.players = data.players;
      this.setWind(data.wind.angle, data.wind.speed);
      this.turn = data.turn;
      this.myTurn = data.isMyTurn
      this.startTurn(); 
    });
  }

  private setWind(angle: number, speed: number): void {
    this.windAngle = angle;
    this.windSpeed = speed;
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
    this.setMyTurn();
    this.interval = window.setInterval(() => {
      this.countDown();
      if (this.counter === 0) {
        clearInterval(this.interval);
        this.nextTurn();
      }
    }, 1000);
  }

  public keydown(e: KeyboardEvent): void {
    if (e.code === 'Space' && this.myTurn) {
      if (this.power < this.maxPower && this.power >= 0) {
        this.power += 1;
      }
    } else if (e.code === 'ArrowLeft' && this.myTurn) {
      this.Tank?.moveLeft();
    } else if (e.code === 'ArrowRight' && this.myTurn) {
      this.Tank?.moveRight();
    } else if (e.code === 'ArrowUp') {
      this.Tank?.upperGunAngle();
    } else if (e.code === 'ArrowDown') {
      this.Tank?.lowerGunAngle();
    }
  }

  public keyUp(e: KeyboardEvent): void {
    if (e.code === 'Space' && this.myTurn) {
      this.lastShot = this.power;
      this.server.shoot({ id: this.players[0].id, power: this.power, angle: this.gunAngle}).subscribe((data) => {
        if (data) {
          this.Tank?.Gun?.shoot(data);
          this.power = 0;
          clearInterval(this.interval);
          this.nextTurn();
        }
      });
    }
  }

  private countDown(): void {
    this.counter > 0 ? (this.counter -= 1) : (this.counter = 0);
  }
}
