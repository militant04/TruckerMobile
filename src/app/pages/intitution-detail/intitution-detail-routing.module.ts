import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntitutionDetailPage } from './intitution-detail.page';

const routes: Routes = [
  {
    path: '',
    component: IntitutionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntitutionDetailPageRoutingModule {}
