import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { roomInterface } from 'src/app/core/interfaces/game.interface';
import { userInterface } from 'src/app/core/interfaces/user.interface';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  public onlinePlayers: Array<string>;
  public user: userInterface;
  public rooms: Array<roomInterface>;
  public joinedRoom: roomInterface | null;

  constructor(private gameService: GameService, private storage: StorageUtils, private router: Router) { 
    this.joinedRoom = null;
    this.user = this.storage.getStorage('user');
    this.onlinePlayers = [];
    this.rooms = [];
    if (this.user) {
    } else {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    this.gameService.onlinePlayers.subscribe(onlinePlayers => {
      this.onlinePlayers = onlinePlayers;
    });
    this.gameService.roomsList.subscribe(rooms => {
      this.rooms = rooms;
    });
    this.gameService.isJoinedRoom.subscribe(room => {
      if (room) {
        this.joinedRoom = room;
      }
    })
    this.gameService.getOnlinePlayers();
    this.verifyIsInRoom();
    this.listenStartGame();
  }

  public verifyIsInRoom(): void {
    this.gameService.verifyIsInRoom(this.user._id).subscribe(room => {
      if (room) {
        this.joinedRoom = room;
      }
    });
  }

  public createRoom(): void {
    this.gameService.createRoom(this.user._id);
  }

  public joinRoom(id: number): void {
    this.gameService.joinRoom(this.user._id, id);
  }

  public listenStartGame(): void {
    this.gameService.gameStarted.subscribe(game => {
      if (game && game._id) {
        this.storage.setStorage('gameStarted', { id: game._id.toString()});
        this.router.navigate(['/game'], { state: { game: game._id.toString() } });
      }
    });
  }

  public leaveRoom(): void {
    this.joinedRoom = null;
    this.gameService.listRooms();
  }
}
