import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepaagePageRoutingModule } from './homepaage-routing.module';

import { HomepaagePage } from './homepaage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepaagePageRoutingModule
  ],
  declarations: [HomepaagePage]
})
export class HomepaagePageModule {}
