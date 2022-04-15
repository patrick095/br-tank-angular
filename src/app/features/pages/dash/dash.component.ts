import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/core/interfaces/user.interface';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  public onlinePlayers: number = 0;
  public user: userInterface;

  constructor(private gameService: GameService, private storage: StorageUtils, private router: Router) { 
    this.user = this.storage.getStorage('user');
    if (this.user) {
    } else {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    this.gameService.sendStatusOnline(this.user._id, this.user.username);
    this.gameService.onlinePlayers.subscribe(onlinePlayers => {
      console.log(onlinePlayers);
      this.onlinePlayers = onlinePlayers.length;
    })
  }

}
