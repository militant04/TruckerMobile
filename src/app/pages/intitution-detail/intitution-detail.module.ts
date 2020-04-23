import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntitutionDetailPageRoutingModule } from './intitution-detail-routing.module';

import { IntitutionDetailPage } from './intitution-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntitutionDetailPageRoutingModule
  ],
  declarations: [IntitutionDetailPage]
})
export class IntitutionDetailPageModule {}
