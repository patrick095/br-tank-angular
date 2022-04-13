import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/core/classes/player.class';
import { GameConfig } from 'src/app/core/configs/game.config';
import { WindEnum } from 'src/app/core/enums/wind.enum';
import { GameStartInterface } from 'src/app/core/interfaces/game.interface';
import { playerInterface } from 'src/app/core/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private players: Array<playerInterface>;


  constructor(private config: GameConfig) { 
    this.players = new Array<playerInterface>();
  }

  public addPlayer(player: playerInterface): void {
    this.players.push(player);
  }

  public startGame(player: playerInterface): Observable<GameStartInterface> {
    this.addPlayer(player);
    this.addPlayer(new Player('player2', 1, 'red'));
    const response = {
      players: this.players,
      isMyTurn: true,
      wind: {
        angle: Math.round(Math.random()) === 0 ? WindEnum.LEFT : WindEnum.RIGHT,
        speed: parseFloat((Math.random() * this.config.MaxWindSpeed).toFixed(1)),
      },
      turn: 0,
    };
    return of(response);
  }
}
