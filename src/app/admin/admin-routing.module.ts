import { AdminModule } from './admin.module';
import { MairieConfComponent } from './mairie-conf/mairie-conf.component';
import { AuthGuard } from './../auth.guard';
import { UsersComponent } from './../users/users.component';
import { ProfileComponent } from './../profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profile } from 'console';

import { Role } from '../manager/role';
import { DashbordComponent } from './dashbord/dashbord.component';
export const routes: Routes = [
    { path: 'dashboard', component: DashbordComponent,  },
    { path: 'profile/:id', component: ProfileComponent,  },
    { path: 'users', component: UsersComponent,  },
    { path: 'confmairie', component: MairieConfComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AdminRoutingModule  {}
