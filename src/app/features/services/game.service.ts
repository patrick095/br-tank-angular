import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameConfig } from 'src/app/core/configs/game.config';
import { GameStartInterface, GunShootInterface, shootInterface } from 'src/app/core/interfaces/game.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = 'https://br-tank.herokuapp.com';

  constructor(private config: GameConfig, private http: HttpClient) {
  }

  public startGame(): Observable<GameStartInterface> {
    return this.http.get<GameStartInterface>(`${this.url}/start-game`)
    
  }

  public shoot({id, angle, power}: shootInterface): Observable<GunShootInterface | null> {
    return this.http.get<GunShootInterface | null>(`${this.url}/fire?id=${id}&angle=${angle}&power=${power}`);
  }

  public newGame(user: string): Observable<any> {
    return this.http.get(`${this.url}/find-game?player=${user}`);
  }

}
