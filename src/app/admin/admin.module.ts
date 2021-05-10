import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { routes, AdminRoutingModule } from './admin-routing.module';
import { UserRoleDirective } from '../manager/user-role.directive';
import { UserDirective } from '../manager/user.directive';
@NgModule({
  declarations: [
    DashboardComponent,
    UserRoleDirective,
    UserDirective
  ],
  imports: [
    RouterModule,
    AdminRoutingModule
  ],
  providers: []
})
export class AdminModule { }
