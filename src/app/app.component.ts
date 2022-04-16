import { Component, OnInit } from '@angular/core';
import { userInterface } from './core/interfaces/user.interface';
import { StorageUtils } from './core/utils/storage.utils';
import { GameService } from './features/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'br-tank-angular';
  private user: userInterface;
  constructor(private gameService: GameService, private storage: StorageUtils) {
    this.user = this.storage.getStorage('user');
  }

  ngOnInit(): void {
    this.gameService.error.subscribe(error => {
      if (error.msg) {
        confirm(error.msg);
        if (error.code === 0) {
          this.storage.removeStorage('user');
          window.location.href = '/';
        }
      }
    });
    if (this.user) {
      this.gameService.sendStatusOnline(this.user._id, this.user.username);
    }
  }
}
