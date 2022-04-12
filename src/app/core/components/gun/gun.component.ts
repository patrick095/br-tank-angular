import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.scss']
})
export class GunComponent implements OnInit {
  @Input() public angle: number;
  public shooting:boolean;
  constructor() {
    this.shooting = false;
    this.angle = 0;
   }

  ngOnInit(): void {
  }

}
