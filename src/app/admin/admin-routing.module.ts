import { UsersComponent } from './../users/users.component';
import { ProfileComponent } from './../profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profile } from 'console';
import { DashboardComponent } from '../dashboard/dashboard.component';
export const routes: Routes = [
    {path: '', redirectTo:'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AdminRoutingModule  {}
