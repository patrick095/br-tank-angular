import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gameInterface, GameStartInterface, getGameInterface, GunShootInterface, roomInterface, shootInterface } from 'src/app/core/interfaces/game.interface';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { chatMessageInterface, socketError } from 'src/app/core/interfaces/server.interface';
import { playerInterface } from 'src/app/core/interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.ApiUrl;
  public onlinePlayers = this.socketIo.fromEvent<Array<string>>('onlinePlayers');
  public roomsList = this.socketIo.fromEvent<Array<roomInterface>>('listRooms');
  public error = this.socketIo.fromEvent<socketError>('error');
  public isJoinedRoom = this.socketIo.fromEvent<roomInterface>('joinedRoom');
  public gameStarted = this.socketIo.fromEvent<gameInterface>('gameStarted');
  public socket: Socket;

  constructor(private http: HttpClient, private socketIo: Socket) {
    this.socket = socketIo;
  }

  public startGame(): Observable<GameStartInterface> {
    return this.http.get<GameStartInterface>(`${this.url}/start-game`)
  }

  public getGame(id: string): Observable<getGameInterface> {
    this.socket.emit('getGame', id);
    return this.socketIo.fromEvent<getGameInterface>('getGame');
  }

  public createRoom(userId: string): void {
    this.socket.emit('newRoom', userId);
  }

  public getOnlinePlayers(): void {
    this.socket.emit('getOnlinePlayers');
  }

  public listenGame(id: string): Observable<getGameInterface> {
    return this.socketIo.fromEvent<getGameInterface>(`game-${id}`);
  }

  public listenShoot(gameId: string): Observable<shootInterface> {
    return this.socketIo.fromEvent<shootInterface>(`shoot-${gameId}`);
  }

  public movePlayer(player: playerInterface, gameId: string): void {
    this.socket.emit('movePlayer', { player, gameId });
  }

  public startRoom(roomId: number) {
    this.socket.emit('startRoom', roomId);
  }

  public listRooms(): void {
    this.socket.emit('listRooms');
  }

  public listenRoom(id: number): Observable<roomInterface> {
    return this.socketIo.fromEvent<roomInterface>('roomChanged'+ id.toString());
  }

  public lstenChatRoom(roomId: number): Observable<chatMessageInterface> {
    return this.socketIo.fromEvent<chatMessageInterface>(`chatRoom${roomId}`);
  }

  public verifyIsInRoom(userId: string): Observable<roomInterface> {
    this.socket.emit('isInRoom', userId);
    return this.socketIo.fromEvent<roomInterface>('isInRoom');
  }

  public sendChatRoom(userId: string, roomId: number, message: string): void {
    this.socket.emit('chatRoom', {userId, roomId, message});
  }

  public sendStatusOnline(id: string, username: string): void {
    this.socket.emit('id', {id, username});
  }

  public shoot(shoot: shootInterface): Observable<GunShootInterface | null> {
    this.socket.emit('shoot', shoot);
    return this.socketIo.fromEvent<GunShootInterface | null>('shoot');
  }

  public hitBullet(gameId: string, playerId: string, damage: number): void {
    this.socket.emit('hitBullet', { gameId, playerId, damage });
  }

  public newGame(user: string): Observable<any> {
    return this.http.get(`${this.url}/find-game?player=${user}`);
  }

  public joinRoom(userId: string, roomId: number) {
    this.socket.emit('joinRoom', { userId, roomId });
  }

  public leaveRoom(userId: string, roomId: number) {
    this.socket.emit('leaveRoom', { userId, roomId });
  }

  public leaveGame(userId: string, gameId: string) {
    this.socket.emit('leaveGame', { userId, gameId })
  }
}
