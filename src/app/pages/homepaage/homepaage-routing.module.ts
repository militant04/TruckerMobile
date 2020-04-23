import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepaagePage } from './homepaage.page';

const routes: Routes = [
  {
    path: '',
    component: HomepaagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepaagePageRoutingModule {}
