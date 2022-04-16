import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { roomInterface } from '../../interfaces/game.interface';
import { userInterface } from '../../interfaces/user.interface';
import { StorageUtils } from '../../utils/storage.utils';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {
  @Input() onlinePlayers: Array<string>;
  @Input() rooms: Array<roomInterface>;
  @Output() createRoom: EventEmitter<any> = new EventEmitter();
  @Output() joinRoom: EventEmitter<any> = new EventEmitter();
  public user: userInterface;

  constructor(private storage: StorageUtils) {
    this.onlinePlayers = [];
    this.rooms = [];
    this.user = this.storage.getStorage('user');
   }

  ngOnInit(): void {

  }

}
