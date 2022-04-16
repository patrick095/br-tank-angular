import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HallComponent } from './hall.component';
import { StorageUtils } from '../../utils/storage.utils';



@NgModule({
  declarations: [
    HallComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HallComponent
  ],
  providers: [StorageUtils]
})
export class HallModule { }
