import { Component, OnInit } from '@angular/core';
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
  private isSpaceBarPressed: boolean;

  constructor(private config: GameConfig) {
    this.players = [];
    this.enemy = {};
    this.isSpaceBarPressed = false;
    this.maxPower = this.config.MaxPower;
    this.turn = 0;
    this.windAngle = 0;
    this.windSpeed = 0;
    this.counter = this.config.CountDown;
  }

  ngOnInit(): void {
	  this.startGame();
  }

  public startGame(): void {
	  this.setWind();
	  this.players = [new Player('player 1', 0, 'red'), new Player('player 2', 1, 'green')];
  }

  private setWind(): void {
	this.windAngle = Math.round(Math.random()) === 0 ? WindEnum.LEFT : WindEnum.RIGHT;
	this.windSpeed = parseFloat((Math.random() * this.config.MaxWindSpeed).toFixed(1));
  }	
}
