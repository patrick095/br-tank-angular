import { Component, OnInit } from '@angular/core';
import { StorageUtils } from './core/utils/storage.utils';
import { GameService } from './features/services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'br-tank-angular';
  constructor(private gameService: GameService, private storage: StorageUtils) { }

  ngOnInit(): void {
    this.gameService.error.subscribe(error => {
      if (error.msg) {
        confirm(error.msg);
        if (error.code === 0) {
          this.storage.removeStorage('user');
          window.location.href = '/';
        }
      }
    })
  }
}
