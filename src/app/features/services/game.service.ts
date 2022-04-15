import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameStartInterface, GunShootInterface, shootInterface } from 'src/app/core/interfaces/game.interface';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { socketError } from 'src/app/core/interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.ApiUrl;
  public onlinePlayers = this.socketIo.fromEvent<Array<string>>('onlinePlayers');
  public error = this.socketIo.fromEvent<socketError>('error');
  public socket: Socket;

  constructor(private http: HttpClient, private socketIo: Socket) {
    this.socket = socketIo;
  }

  public startGame(): Observable<GameStartInterface> {
    return this.http.get<GameStartInterface>(`${this.url}/start-game`)
  }

  public sendStatusOnline(id: string, username: string): void {
    this.socket.emit('id', {id, username});
  }

  public shoot({id, angle, power}: shootInterface): Observable<GunShootInterface | null> {
    return this.http.get<GunShootInterface | null>(`${this.url}/fire?id=${id}&angle=${angle}&power=${power}`);
  }

  public newGame(user: string): Observable<any> {
    return this.http.get(`${this.url}/find-game?player=${user}`);
  }

}
