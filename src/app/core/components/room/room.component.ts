import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GameService } from 'src/app/features/services/game.service';
import { roomInterface } from '../../interfaces/game.interface';
import { userInterface } from '../../interfaces/user.interface';
import { StorageUtils } from '../../utils/storage.utils';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  @Input() room: roomInterface;
  @Output() leave: EventEmitter<boolean> = new EventEmitter();
  public user: userInterface;
  constructor(private gameService: GameService, private storage: StorageUtils) { 
    this.room = {
      id: 0,
      players: [],
      status: 'finished'
    };
    this.user = this.storage.getStorage('user');
  }

  ngOnInit(): void {
    console.log(this.room)
    this.listenChange();
  }

  ngOnDestroy(): void {
    this.gameService.leaveRoom(this.user._id, this.room.id);
  }

  public leaveRoom(): void {
    this.gameService.leaveRoom(this.user._id, this.room.id);
    this.leave.emit(true);
  }

  private listenChange(): void {
    this.gameService.listenRoom(this.room.id).subscribe(room => {
      this.room = room;
    })
  }
}
