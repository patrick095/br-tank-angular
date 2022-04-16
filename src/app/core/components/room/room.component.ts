import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GameService } from 'src/app/features/services/game.service';
import { roomInterface } from '../../interfaces/game.interface';
import { chatMessageInterface } from '../../interfaces/server.interface';
import { userInterface } from '../../interfaces/user.interface';
import { StorageUtils } from '../../utils/storage.utils';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @ViewChild('chatList') chat?: ElementRef<HTMLDivElement>;
  @Input() room: roomInterface;
  @Output() leave: EventEmitter<boolean> = new EventEmitter();
  public user: userInterface;
  public messages: Array<chatMessageInterface>;
  constructor(private gameService: GameService, private storage: StorageUtils) { 
    this.room = {
      id: 0,
      players: [],
      status: 'finished'
    };
    this.messages = [];
    this.user = this.storage.getStorage('user');
  }

  ngOnInit(): void {
    this.listenChange();
    this.gameService.lstenChatRoom(this.room.id).subscribe(message => {
      this.messages.push(message);
      setTimeout(() => {
        this.chat ? this.chat.nativeElement.scrollTop = this.chat?.nativeElement.scrollHeight : null;
      }, 50);
    });
  }

  // ngOnDestroy(): void {
  //   this.gameService.leaveRoom(this.user._id, this.room.id);
  // }

  public sendMessage(event: Event, input: HTMLInputElement): void {
    const message = input.value;
    input.value = '';
    event.preventDefault();
    if (message.length > 0) {
      this.gameService.sendChatRoom(this.user._id, this.room.id, message);
    }
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

  public startGameRoom(): void {
    this.gameService.startRoom(this.room.id);
  }
}
