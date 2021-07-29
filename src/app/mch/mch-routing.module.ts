import { DetailVoletComponent } from './detail-volet/detail-volet.component';
import { VoletComponent } from './volet/volet.component';
import { DeclarationComponent } from './declaration/declaration.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'declaration', component: DeclarationComponent},
  {path: 'volets', component: VoletComponent},
  {path: 'volet/:id', component: DetailVoletComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MchRoutingModule { }
