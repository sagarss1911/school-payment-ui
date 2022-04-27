import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetInfoComponent } from './get-info/get-info.component';

const routes: Routes = [
  {
    path: '', component: GetInfoComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
