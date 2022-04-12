import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.scss']
})
export class GunComponent implements OnInit {
  public shooting:boolean;
  constructor() {
    this.shooting = false;
   }

  ngOnInit(): void {
  }

}
