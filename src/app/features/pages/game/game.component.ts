import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/core/classes/player.class';
import { TankComponent } from 'src/app/core/components/tank/tank.component';
import { GameConfig } from 'src/app/core/configs/game.config';
import { WindEnum } from 'src/app/core/enums/wind.enum';
import { gameInterface, GameStartInterface } from 'src/app/core/interfaces/game.interface';
import { playerInterface } from 'src/app/core/interfaces/player.interface';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('myTank') Tank?:TankComponent;
  public player?: playerInterface;
  public enemy?: playerInterface;
  public maxPower: number;
  public turn: number;
  public counter: number;
  public windAngle: number;
  public windSpeed: number;
  public power: number;
  public lastShot: number;
  public myTurn: boolean;
  public gunAngle: number;
  public gameData?: gameInterface;
  private interval?: number;
  private gameId: string;
  private playerId: string;

  @HostListener('document:keydown', ['$event'])
  handleKeyPressEvent(e: KeyboardEvent) {
    this.keydown(e);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(e: KeyboardEvent) {
    this.keyUp(e);
  }

  constructor(private config: GameConfig, private server: GameService, private router: Router, private storage: StorageUtils) {
    this.maxPower = this.config.MaxPower;
    this.turn = 0;
    this.windAngle = 0;
    this.windSpeed = 0;
    this.power = 0;
    this.lastShot = 0;
    this.counter = this.config.CountDown;
    this.myTurn = false;
    this.gunAngle = 0;
    this.gameId = this.storage.getStorage('gameStarted')?.id;
    this.playerId = this.storage.getStorage('user')?.playerId;
  }

  ngOnInit(): void {
    if (this.gameId) {
      this.server.getGame(this.gameId).subscribe(({ game, players}) => {
        if (game && players) {
          this.gameData = game;
          this.player = players.find((player) => player._id === this.playerId);
          this.enemy = players.find((player) => player._id !== this.playerId);
          this.setWind(game.wind.angle, game.wind.speed);
          this.myTurn = this.playerId === game.playerTurn;
        }
      });
      this.updateGame();
    } else {
      this.router.navigate(['/dash']);
    }
  }

  ngOnDestroy(): void {
    this.storage.removeStorage('gameStarted');
  }

  private updateGame(): void {
    this.server.listenGame(this.gameId).subscribe(({ game, players }) => {
      console.log(game, players)
      const enemy = players?.find((player) => player._id !== this.playerId);
      const myPlayer = players?.find((player) => player._id === this.playerId)
      if (game) {
        this.gameData = game;
        this.setWind(game.wind.angle, game.wind.speed);
        this.myTurn = this.playerId === game.playerTurn;
        this.counter = game.countdown;
        if (players && myPlayer) {
          this.player = myPlayer;
        }
        if (this.gameData.winner) {
          confirm('Fim de jogo, o vencedor é "' + this.gameData.winner.name + '"');
          this.router.navigate(['/dash']);
        }
      }
      if (enemy && this.enemy) {
        this.enemy.position = enemy.position;
        this.enemy.angle = enemy.angle;
      }
    });
  }

  public exit() {
    this.router.navigate(['/dash']);
  }

  private setWind(angle: number, speed: number): void {
    this.windAngle = angle;
    this.windSpeed = speed;
  }

  // private setMyTurn(): void {
  //   this.myTurn = this.turn % 2 === 0;
  // }

  // private nextTurn(): void {
  //   this.turn += 1;
  //   this.counter = this.config.CountDown;
  //   this.startTurn();
  // }

  // private startTurn(): void {
  //   this.setMyTurn();
  //   this.interval = window.setInterval(() => {
  //     this.countDown();
  //     if (this.counter === 0) {
  //       clearInterval(this.interval);
  //       this.nextTurn();
  //     }
  //   }, 1000);
  // }

  public keydown(e: KeyboardEvent): void {
    if (e.code === 'Space' && this.myTurn) {
      if (this.power < this.maxPower && this.power >= 0) {
        this.power += 1;
      }
    } else if (e.code === 'ArrowLeft' && this.myTurn  && this.counter > 0) {
      this.Tank?.moveLeft();
    } else if (e.code === 'ArrowRight' && this.myTurn  && this.counter > 0) {
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
      if (this.player && this.gameData) {
        this.server.shoot({ playerId: this.player?._id, power: this.power, gameId: this.gameData?._id}).subscribe((data) => {
          if (data) {
            this.Tank?.Gun?.shoot(data);
            this.power = 0;
            clearInterval(this.interval);
            // this.nextTurn();
          }
        });
      }
    }
  }

  // private countDown(): void {
  //   this.counter > 0 ? (this.counter -= 1) : (this.counter = 0);
  // }
}
